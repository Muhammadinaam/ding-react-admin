import { Select } from "antd";
import { useMemo, useState } from "react";
import type { BaseSourceProps, FieldRules, ReferenceProps } from "../types";
import { useChoices } from "../utils/useChoices";
import { FieldWrapper } from "./FieldWrapper";

export type ReferenceManyFieldProps = BaseSourceProps &
  ReferenceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    search?: boolean;
    allowClear?: boolean;
    hideLabel?: boolean;
  };

export function ReferenceManyField({
  source,
  name,
  label,
  reference,
  choices,
  optionLabel = "name",
  optionValue = "id",
  required,
  rules,
  search,
  allowClear = true,
  hideLabel,
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

  return (
    <FieldWrapper
      source={source}
      name={name}
      label={label}
      required={required}
      rules={rules}
      hideLabel={hideLabel}
    >
      {({ value, onChange, disabled }) => (
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
      )}
    </FieldWrapper>
  );
}
