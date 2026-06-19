import { describe, expect, it, vi } from "vitest";
import { buildFormPayload } from "../crud/utils/buildFormPayload";
import { buildInlineRowsPayload } from "../crud/utils/buildInlineRowsPayload";
import { nestedFieldPath } from "../crud/utils/nestedFieldPath";
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
});
