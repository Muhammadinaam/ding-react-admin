import { describe, expect, it } from "vitest";

import {
  describeNonStandardValidationBody,
  parseDjangoDRFFormErrors,
  parseDotNetFormErrors,
  parseNodeFormErrors,
  flattenNestedArrayErrors,
  resolveErrorBody,
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

  it("returns null when no field messages can be extracted", () => {
    const parsed = parseDjangoDRFFormErrors(
      { body: { code: 123, nested: { foo: "bar" } } },
      mainCtx,
    );

    expect(parsed).toBeNull();
  });
});

describe("describeNonStandardValidationBody", () => {
  it("includes expected shape and received JSON", () => {
    const message = describeNonStandardValidationBody({ message: "Oops" });

    expect(message).toContain("Non-standard validation response.");
    expect(message).toContain('"field_name"');
    expect(message).toContain('Received: {"message":"Oops"}');
  });

  it("truncates long received bodies", () => {
    const longValue = "x".repeat(400);
    const message = describeNonStandardValidationBody({ detail: longValue });

    expect(message).toContain("…");
    expect(message).not.toContain(longValue);
  });

  it("supports explicit hints for non-json responses", () => {
    const message = describeNonStandardValidationBody(null, {
      hint: "non-JSON response (Content-Type: text/plain)",
    });

    expect(message).toContain(
      "Received: non-JSON response (Content-Type: text/plain)",
    );
  });
});

describe("resolveErrorBody", () => {
  it("reads axios-style response.data", async () => {
    const body = await resolveErrorBody({
      response: { data: { email: ["Invalid"] } },
    });

    expect(body).toEqual({ email: ["Invalid"] });
  });

  it("reads fetch ResponseError response.json()", async () => {
    const response = new Response(
      JSON.stringify({ email: ["Enter a valid email address."] }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );

    const body = await resolveErrorBody({
      name: "ResponseError",
      message: "Response returned an error code",
      response,
    });

    expect(body).toEqual({ email: ["Enter a valid email address."] });
  });

  it("normalizes top-level JSON array bodies", async () => {
    const response = new Response(
      JSON.stringify(["This code is already in use."]),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );

    const body = await resolveErrorBody({ response });

    expect(body).toEqual({ non_field_errors: "This code is already in use." });
  });

  it("returns null for non-json fetch responses", async () => {
    const response = new Response("bad request", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });

    const body = await resolveErrorBody({ response });

    expect(body).toBeNull();
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
