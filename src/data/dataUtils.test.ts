import { describe, expect, it, vi } from "vitest";
import { buildFormPayload } from "../crud/utils/buildFormPayload";
import { buildInlineRowsPayload } from "../crud/utils/buildInlineRowsPayload";
import { nestedFieldPath } from "../crud/utils/nestedFieldPath";
import { hasUploadValues } from "../crud/utils/hasUploadValues";
import { prepareFormSubmitBody } from "../crud/utils/prepareFormSubmitBody";
import { toFormData } from "../crud/utils/toFormData";
import { createRestResourceHandlers } from "./createRestResourceHandlers";
import {
  toDjangoRestOrdering,
  toJsonApiSort,
  toODataOrderBy,
} from "./sortHelpers";

describe("buildFormPayload", () => {
  it("picks flat fields", () => {
    const values = {
      username: "jane",
      email: "jane@example.com",
      tenants: [{ id: 1 }],
    };
    expect(buildFormPayload(values, ["username", "email"])).toEqual({
      username: "jane",
      email: "jane@example.com",
    });
  });

  it("picks nested fields", () => {
    const values = {
      invoiceLine: { product: "SKU-1", quantity: 2 },
      extra: "ignored",
    };
    expect(
      buildFormPayload(values, ["invoiceLine.product", "invoiceLine.quantity"]),
    ).toEqual({
      invoiceLine: { product: "SKU-1", quantity: 2 },
    });
  });

  it("returns all values when no field paths registered", () => {
    const values = { a: 1, b: 2 };
    expect(buildFormPayload(values, [])).toEqual(values);
  });
});

describe("buildInlineRowsPayload", () => {
  it("picks sources and keeps record id", () => {
    const rows = [
      { rowKey: "a", id: 10, label: "A", quantity: 2, extra: "x" },
      { rowKey: "b", label: "B", quantity: 1 },
    ];
    expect(buildInlineRowsPayload(rows, ["label", "quantity"])).toEqual([
      { label: "A", quantity: 2, id: 10 },
      { label: "B", quantity: 1 },
    ]);
  });

  it("applies transformRows", () => {
    const rows = [{ rowKey: "a", label: "A" }];
    const result = buildInlineRowsPayload(rows, ["label"], {
      transformRows: (cleaned) => cleaned.map((r) => ({ ...r, kind: "line" })),
    });
    expect(result).toEqual([{ label: "A", kind: "line" }]);
  });
});

describe("nestedFieldPath", () => {
  it("builds dot paths", () => {
    expect(nestedFieldPath("lines", 0, "label")).toBe("lines.0.label");
  });
});

describe("hasUploadValues", () => {
  it("detects File in nested payload", () => {
    const file = new File(["x"], "a.png", { type: "image/png" });
    expect(hasUploadValues({ name: "x" })).toBe(false);
    expect(hasUploadValues({ photo: file })).toBe(true);
    expect(hasUploadValues({ lines: [{ photo: file }] })).toBe(true);
  });
});

describe("toFormData", () => {
  it("encodes flat scalars and files", () => {
    const file = new File(["x"], "photo.png", { type: "image/png" });
    const fd = toFormData({ name: "Widget", active: true, count: 2, photo: file });

    expect(fd.get("name")).toBe("Widget");
    expect(fd.get("active")).toBe("true");
    expect(fd.get("count")).toBe("2");
    expect(fd.get("photo")).toBe(file);
  });

  it("encodes null as empty string and skips unchanged upload URLs", () => {
    const fd = toFormData({
      photo: null,
      avatar: "https://cdn.example.com/a.jpg",
      title: "Hello",
    });

    expect(fd.get("photo")).toBe("");
    expect(fd.get("avatar")).toBeNull();
    expect(fd.get("title")).toBe("Hello");
  });

  it("encodes inline rows with bracket notation", () => {
    const file = new File(["x"], "line.png", { type: "image/png" });
    const fd = toFormData({
      lines: [{ id: 10, label: "A", photo: file }],
    });

    expect(fd.get("lines[0][id]")).toBe("10");
    expect(fd.get("lines[0][label]")).toBe("A");
    expect(fd.get("lines[0][photo]")).toBe(file);
  });
});

describe("prepareFormSubmitBody", () => {
  it("returns plain object when no uploads", () => {
    const payload = { name: "Widget" };
    expect(prepareFormSubmitBody(payload)).toEqual(payload);
  });

  it("omits unchanged upload references from JSON payloads", () => {
    const body = prepareFormSubmitBody({
      name: "Widget",
      photo: "/media/employee_pictures/default.png",
    });
    expect(body).toEqual({ name: "Widget" });
  });

  it("returns FormData when uploads are present", () => {
    const file = new File(["x"], "a.png", { type: "image/png" });
    const body = prepareFormSubmitBody({ name: "Widget", photo: file });
    expect(body).toBeInstanceOf(FormData);
    expect((body as FormData).get("photo")).toBe(file);
  });
});

describe("sort helpers", () => {
  it("toDjangoRestOrdering", () => {
    expect(toDjangoRestOrdering({ field: "username", order: "ASC" })).toBe(
      "username",
    );
    expect(toDjangoRestOrdering({ field: "username", order: "DESC" })).toBe(
      "-username",
    );
    expect(
      toDjangoRestOrdering([
        { field: "username", order: "ASC" },
        { field: "date_joined", order: "DESC" },
      ]),
    ).toBe("username,-date_joined");
  });

  it("toODataOrderBy", () => {
    expect(toODataOrderBy({ field: "username", order: "DESC" })).toBe(
      "username desc",
    );
  });

  it("toJsonApiSort", () => {
    expect(toJsonApiSort({ field: "username", order: "DESC" })).toBe(
      "-username",
    );
  });
});

describe("createRestResourceHandlers", () => {
  it("passes form payload through on create/update", async () => {
    const create = vi.fn(async (data) => ({ id: "1", ...data }));
    const update = vi.fn(async (_id, data) => ({ id: "1", ...data }));

    const handlers = createRestResourceHandlers({
      list: async () => ({ data: [], total: 0 }),
      retrieve: async () => ({ id: "1" }),
      create,
      update,
      destroy: async () => {},
    });

    await handlers.create({ username: "jane" });
    expect(create).toHaveBeenCalledWith({ username: "jane" });

    await handlers.update({ id: "1", data: { email: "a@b.c" } });
    expect(update).toHaveBeenCalledWith("1", { email: "a@b.c" });
  });

  it("applies transformCreate and transformUpdate when provided", async () => {
    const create = vi.fn(async (data) => data);
    const update = vi.fn(async (_id, data) => data);

    const handlers = createRestResourceHandlers({
      list: async () => ({ data: [], total: 0 }),
      retrieve: async () => ({}),
      create,
      update,
      destroy: async () => {},
      transformCreate: (data) => ({ user: data }),
      transformUpdate: (data) => ({ patch: data }),
    });

    await handlers.create({ username: "jane" });
    expect(create).toHaveBeenCalledWith({ user: { username: "jane" } });

    await handlers.update({ id: "1", data: { username: "bob" } });
    expect(update).toHaveBeenCalledWith("1", { patch: { username: "bob" } });
  });

  it("passes FormData through without transform", async () => {
    const create = vi.fn(async (data) => data);
    const transformCreate = vi.fn((data) => data);

    const handlers = createRestResourceHandlers({
      list: async () => ({ data: [], total: 0 }),
      retrieve: async () => ({}),
      create,
      update: async (_id, data) => data,
      destroy: async () => {},
      transformCreate,
    });

    const fd = new FormData();
    fd.append("name", "Widget");
    await handlers.create(fd);
    expect(transformCreate).not.toHaveBeenCalled();
    expect(create).toHaveBeenCalledWith(fd);
  });
});
