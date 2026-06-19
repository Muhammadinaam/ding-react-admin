import { describe, expect, it } from "vitest";
import {
  parseDjangoDRFFormErrors,
  parseDotNetFormErrors,
  parseNodeFormErrors,
  flattenNestedArrayErrors,
} from "./parseFormErrorHelpers";

const mainCtx = { resource: "users", mutation: "create" as const };

describe("parseDjangoDRFFormErrors", () => {
  it("maps field and non_field_errors", () => {
    const parsed = parseDjangoDRFFormErrors(
      {
        body: {
          email: ["Enter a valid email."],
          non_field_errors: ["Cannot save"],
        },
      },
      mainCtx,
    );
    expect(parsed).toEqual({
      fields: { email: "Enter a valid email." },
      global: ["Cannot save"],
    });
  });

  it("flattens nested inline row errors", () => {
    const parsed = parseDjangoDRFFormErrors(
      {
        body: {
          lines: [
            { quantity: ["Must be positive"] },
            {},
            { label: ["Required"] },
          ],
        },
      },
      mainCtx,
    );
    expect(parsed?.fields).toEqual({
      "lines.0.quantity": "Must be positive",
      "lines.2.label": "Required",
    });
  });
});

describe("flattenNestedArrayErrors", () => {
  it("maps row errors to RHF paths", () => {
    const fields: Record<string, string | string[]> = {};
    flattenNestedArrayErrors("lines", [
      { label: ["Required"] },
      { quantity: ["Too small", "Invalid"] },
    ], fields);
    expect(fields).toEqual({
      "lines.0.label": "Required",
      "lines.1.quantity": ["Too small", "Invalid"],
    });
  });
});

describe("parseDotNetFormErrors", () => {
  it("maps errors object with camelCase", () => {
    const parsed = parseDotNetFormErrors(
      {
        body: {
          errors: { Email: ["The Email field is required."] },
        },
      },
      mainCtx,
    );
    expect(parsed?.fields).toEqual({
      email: "The Email field is required.",
    });
  });
});

describe("parseNodeFormErrors", () => {
  it("maps express-validator array", () => {
    const parsed = parseNodeFormErrors(
      {
        body: {
          errors: [{ path: "email", msg: "Invalid email" }],
        },
      },
      mainCtx,
    );
    expect(parsed?.fields).toEqual({ email: "Invalid email" });
  });

  it("maps Joi details", () => {
    const parsed = parseNodeFormErrors(
      {
        body: {
          details: [{ message: "Required", path: ["email"] }],
        },
      },
      mainCtx,
    );
    expect(parsed?.fields).toEqual({ email: "Required" });
  });
});
