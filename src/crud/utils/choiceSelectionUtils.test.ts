import { describe, expect, it } from "vitest";
import {
  collectSelectedRecords,
  isRecordObject,
  keepSelectedOptions,
  mergeSelectedLabelMap,
  normalizeSelectedIds,
  optionsFromLabelMap,
  recordsToOptions,
  unresolvedSelectedIds,
  valueAsId,
  valuesAsIds,
} from "./choiceSelectionUtils";
import { resolveLabelSourcePath } from "./resolveLabelSourcePath";

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

  it("finds selected ids that do not yet have options", () => {
    const options = [{ label: "One", value: "1" }];
    expect(unresolvedSelectedIds(["1", "2"], [])).toEqual(["1", "2"]);
    expect(unresolvedSelectedIds(["1", "2"], options)).toEqual(["2"]);
    expect(unresolvedSelectedIds(["1"], options)).toEqual([]);
    expect(unresolvedSelectedIds([], options)).toEqual([]);
  });

  it("keeps selected options when replacing a lazy dropdown list", () => {
    const previous = [
      { label: "One", value: "1" },
      { label: "Two", value: "2" },
    ];
    const embedded = [{ label: "Embedded", value: "3" }];
    expect(keepSelectedOptions(previous, ["2"], embedded)).toEqual([
      { label: "Embedded", value: "3" },
      { label: "Two", value: "2" },
    ]);
    expect(keepSelectedOptions(previous, [], [])).toEqual([]);
  });

  it("maps a single selected label onto the current id", () => {
    const map = mergeSelectedLabelMap(["12"], "Jane Doe", new Map());
    expect(optionsFromLabelMap(["12"], map)).toEqual([
      { label: "Jane Doe", value: "12" },
    ]);
  });

  it("zips multi-select labels by index, then keeps them by id after removal", () => {
    const initial = mergeSelectedLabelMap(
      ["1", "2"],
      ["Red", "Blue"],
      new Map(),
    );
    expect(optionsFromLabelMap(["1", "2"], initial)).toEqual([
      { label: "Red", value: "1" },
      { label: "Blue", value: "2" },
    ]);

    const afterRemove = mergeSelectedLabelMap(
      ["2"],
      ["Red", "Blue"],
      initial,
    );
    expect(optionsFromLabelMap(["2"], afterRemove)).toEqual([
      { label: "Blue", value: "2" },
    ]);
  });

  it("resolves a single-segment labelSource as a sibling of the field name", () => {
    expect(resolveLabelSourcePath("branch_display", undefined, "branch")).toBe(
      "branch_display",
    );
    expect(
      resolveLabelSourcePath("shift_display", "rules.0.shift", "shift"),
    ).toBe("rules.0.shift_display");
    expect(
      resolveLabelSourcePath("rules.0.shift_display", "rules.0.shift", "shift"),
    ).toBe("rules.0.shift_display");
  });
});
