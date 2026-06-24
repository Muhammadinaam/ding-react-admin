import { Select } from "antd";
import { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import type { BaseSourceProps, FieldRules, ReferenceProps } from "../types";
import { valuesAsIds } from "../utils/choiceSelectionUtils";
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

type ReferenceManyFieldSelectProps = Omit<
  ReferenceManyFieldProps,
  "source" | "label" | "required" | "rules" | "hideLabel" | "name"
> & {
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
  selectedRecords?: Record<string, unknown> | Record<string, unknown>[];
};

function ReferenceManyFieldSelect({
  reference,
  choices,
  optionLabel = "name",
  optionValue = "id",
  search,
  allowClear = true,
  lazy = true,
  fetchSelected = true,
  value,
  onChange,
  disabled,
  selectedRecords,
}: ReferenceManyFieldSelectProps) {
  const [searchText, setSearchText] = useState<string | undefined>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const active = dropdownOpen || Boolean(searchText);
  const selectValue = valuesAsIds(value, optionValue);

  const { options, loading } = useChoices(
    choices,
    reference,
    optionLabel,
    optionValue,
    search ? searchText : undefined,
    {
      lazy,
      active,
      selectedValues: value,
      selectedRecords,
      fetchSelected,
    },
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
    <Select
      mode="multiple"
      value={selectValue}
      onChange={onChange}
      options={selectOptions}
      loading={loading && selectOptions.length === 0}
      showSearch={search}
      filterOption={search ? false : undefined}
      onSearch={search ? setSearchText : undefined}
      onDropdownVisibleChange={(open) => {
        setDropdownOpen(open);
        if (!open) setSearchText(undefined);
      }}
      allowClear={allowClear}
      disabled={disabled}
      optionFilterProp="label"
      style={{ width: "100%" }}
    />
  );
}

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
  lazy = true,
  recordSource,
  fetchSelected = true,
}: ReferenceManyFieldProps) {
  const embeddedRecords = useWatch({
    name: recordSource ?? "",
    disabled: !recordSource,
  }) as Record<string, unknown> | Record<string, unknown>[] | undefined;

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
        <ReferenceManyFieldSelect
          reference={reference}
          choices={choices}
          optionLabel={optionLabel}
          optionValue={optionValue}
          search={search}
          allowClear={allowClear}
          lazy={lazy}
          fetchSelected={fetchSelected}
          value={value}
          onChange={onChange}
          disabled={disabled}
          selectedRecords={recordSource ? embeddedRecords : undefined}
        />
      )}
    </FieldWrapper>
  );
}
