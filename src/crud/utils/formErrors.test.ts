import { describe, expect, it, vi } from "vitest";
import type { UseFormReturn } from "react-hook-form";

import type { DataProvider } from "../../data/dataProviderTypes";
import type { InlineFieldRegistration } from "../context/InlineFieldsRegistry";
import {
  applyApiErrorsToForm,
  isKnownFormFieldPath,
  partitionFormErrors,
} from "./formErrors";

const inlineRegistry = new Map<string, InlineFieldRegistration>([
  [
    "lines",
    {
      field: "lines",
      sources: ["label", "quantity"],
    },
  ],
]);

describe("isKnownFormFieldPath", () => {
  it("matches top-level payload fields", () => {
    const payloadFields = new Set(["name", "email"]);
    expect(isKnownFormFieldPath("name", payloadFields, inlineRegistry)).toBe(
      true,
    );
    expect(
      isKnownFormFieldPath("unknown", payloadFields, inlineRegistry),
    ).toBe(false);
  });

  it("matches inline nested paths", () => {
    const payloadFields = new Set(["lines"]);
    expect(
      isKnownFormFieldPath("lines.0.quantity", payloadFields, inlineRegistry),
    ).toBe(true);
    expect(
      isKnownFormFieldPath("lines.2.label", payloadFields, inlineRegistry),
    ).toBe(true);
    expect(
      isKnownFormFieldPath("lines.0.missing", payloadFields, inlineRegistry),
    ).toBe(false);
  });
});

describe("partitionFormErrors", () => {
  it("keeps known fields and promotes unknown keys to global", () => {
    const payloadFields = new Set(["name"]);
    const { fieldErrors, globalErrors } = partitionFormErrors(
      {
        fields: {
          name: "Required",
          internal_code: "Already used",
        },
        global: ["Cannot save while locked"],
      },
      payloadFields,
      inlineRegistry,
    );

    expect(fieldErrors).toEqual({ name: "Required" });
    expect(globalErrors).toEqual([
      "Cannot save while locked",
      "Already used",
    ]);
  });

  it("routes inline errors to fields when the column exists", () => {
    const payloadFields = new Set(["lines"]);
    const { fieldErrors, globalErrors } = partitionFormErrors(
      {
        fields: {
          "lines.0.quantity": "Must be positive",
          "lines.1.unknown": "Bad value",
        },
      },
      payloadFields,
      inlineRegistry,
    );

    expect(fieldErrors).toEqual({
      "lines.0.quantity": "Must be positive",
    });
    expect(globalErrors).toEqual(["Bad value"]);
  });
});

describe("applyApiErrorsToForm", () => {
  const context = { resource: "users", mutation: "create" as const };
  const options = {
    payloadFields: new Set(["email"]),
    inlineRegistry: [] as InlineFieldRegistration[],
  };

  function createForm() {
    return {
      setError: vi.fn(),
    } as unknown as UseFormReturn<{ email: string }>;
  }

  it("maps standard validation bodies to field errors", async () => {
    const form = createForm();
    const dp = {
      parseFormError: vi.fn().mockReturnValue({
        fields: { email: "Already taken" },
      }),
    } as unknown as DataProvider;

    const result = await applyApiErrorsToForm(
      dp,
      form,
      {
        body: { email: ["Already taken"] },
      },
      context,
      options,
    );

    expect(result.handled).toBe(true);
    expect(result.globalErrors).toEqual([]);
    expect(form.setError).toHaveBeenCalledWith("email", {
      type: "server",
      message: "Already taken",
    });
  });

  it("returns a non-standard format warning when the parser cannot map the body", async () => {
    const form = createForm();
    const dp = {
      parseFormError: vi.fn().mockReturnValue(null),
    } as unknown as DataProvider;

    const result = await applyApiErrorsToForm(
      dp,
      form,
      { body: { message: "Unexpected shape" } },
      context,
      options,
    );

    expect(result.handled).toBe(true);
    expect(result.globalErrors[0]).toContain("Non-standard validation response.");
    expect(result.globalErrors[0]).toContain('{"message":"Unexpected shape"}');
    expect(form.setError).not.toHaveBeenCalled();
  });

  it("returns a non-standard format warning for HTTP 400 without JSON", async () => {
    const form = createForm();
    const dp = {} as DataProvider;
    const response = new Response("bad request", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });

    const result = await applyApiErrorsToForm(
      dp,
      form,
      { response },
      context,
      options,
    );

    expect(result.handled).toBe(true);
    expect(result.globalErrors[0]).toContain("Non-standard validation response.");
    expect(result.globalErrors[0]).toContain("text/plain");
  });
});
