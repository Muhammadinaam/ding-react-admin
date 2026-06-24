import { describe, expect, it } from "vitest";
import {
  collectSelectedRecords,
  isRecordObject,
  normalizeSelectedIds,
  recordsToOptions,
  valueAsId,
  valuesAsIds,
} from "./choiceSelectionUtils";

describe("choiceSelectionUtils", () => {
  it("detects nested record objects", () => {
    expect(isRecordObject({ id: 1, name: "Branch 1" }, "id")).toBe(true);
    expect(isRecordObject("1", "id")).toBe(false);
  });

  it("extracts ids from primitive or nested values", () => {
    expect(valueAsId("abc", "id")).toBe("abc");
    expect(valueAsId({ id: 2, name: "Two" }, "id")).toBe(2);
    expect(valuesAsIds([{ id: 1, name: "One" }, "2"], "id")).toEqual([1, "2"]);
    expect(normalizeSelectedIds([{ id: 3, name: "Three" }], "id")).toEqual([3]);
  });

  it("collects embedded records from value and recordSource data", () => {
    const records = collectSelectedRecords(
      [{ id: 1, name: "One" }, "2"],
      { id: 3, name: "Three" },
      "id",
    );
    expect(records).toHaveLength(2);
    expect(records.map((record) => record.id).sort()).toEqual([1, 3]);
  });

  it("maps records to select options", () => {
    expect(
      recordsToOptions([{ id: 1, name: "Branch 1" }], "name", "id"),
    ).toEqual([
      {
        label: "Branch 1",
        value: 1,
        record: { id: 1, name: "Branch 1" },
      },
    ]);
  });
});
