import { Select } from "antd";
import { useMemo, useState } from "react";
import type { BaseSourceProps, FieldRules, ReferenceProps } from "../types";
import { useChoices } from "../utils/useChoices";
import { useInlineOrFormField } from "./useInlineOrFormField";

export type ReferenceManyFieldProps = BaseSourceProps &
  ReferenceProps & {
    required?: boolean;
    rules?: FieldRules;
    search?: boolean;
    allowClear?: boolean;
  };

export function ReferenceManyField({
  source,
  label,
  reference,
  choices,
  optionLabel = "name",
  optionValue = "id",
  required,
  rules,
  search,
  allowClear = true,
}: ReferenceManyFieldProps) {
  const [searchText, setSearchText] = useState<string | undefined>();
  const { options, loading } = useChoices(
    choices,
    reference,
    optionLabel,
    optionValue,
    search ? searchText : undefined,
  );

  const selectOptions = useMemo(
    () =>
      options.map((o) => ({
        label: o.label,
        value: o.value as string | number,
      })),
    [options],
  );

  const field = useInlineOrFormField(
    source,
    label,
    required,
    rules,
    ({ value, onChange, disabled }) => (
      <Select
        mode="multiple"
        value={(value as (string | number)[] | undefined) ?? []}
        onChange={onChange}
        options={selectOptions}
        loading={loading}
        showSearch={search}
        filterOption={search ? false : undefined}
        onSearch={search ? setSearchText : undefined}
        allowClear={allowClear}
        disabled={disabled}
        optionFilterProp="label"
        style={{ width: "100%" }}
      />
    ),
  );

  if (field.mode === "inline") return null;
  return field.element;
}
