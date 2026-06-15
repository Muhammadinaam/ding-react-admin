import { describe, expect, it } from "vitest";
import { isAbortError } from "./abortError";

describe("isAbortError", () => {
  it("detects DOM AbortError", () => {
    expect(isAbortError({ name: "AbortError" })).toBe(true);
  });

  it("detects axios CanceledError", () => {
    expect(isAbortError({ name: "CanceledError", code: "ERR_CANCELED" })).toBe(
      true,
    );
  });

  it("returns false for ordinary errors", () => {
    expect(isAbortError(new Error("Network Error"))).toBe(false);
    expect(isAbortError(null)).toBe(false);
  });
});
