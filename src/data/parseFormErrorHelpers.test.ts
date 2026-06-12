import { describe, expect, it } from "vitest";
import {
  parseDjangoDRFFormErrors,
  parseDotNetFormErrors,
  parseNodeFormErrors,
} from "./parseFormErrorHelpers";

const mainCtx = { resource: "users", mutation: "create" as const };
const inlineCtx = {
  resource: "invoice-lines",
  mutation: "create" as const,
  inlineArrayName: "__inline_invoice_lines",
  rowIndex: 1,
};

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

  it("prefixes inline row fields", () => {
    const parsed = parseDjangoDRFFormErrors(
      { body: { quantity: ["Must be positive"] } },
      inlineCtx,
    );
    expect(parsed?.fields).toEqual({
      "__inline_invoice_lines.1.quantity": "Must be positive",
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
