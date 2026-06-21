import { describe, expect, it } from "vitest";

import type { InlineFieldRegistration } from "../context/InlineFieldsRegistry";
import {
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
