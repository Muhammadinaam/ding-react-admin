import { Select } from "antd";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import type {
  BaseSourceProps,
  ChoiceOption,
  FieldRules,
  ReferenceProps,
} from "../types";
import { valueAsId } from "../utils/choiceSelectionUtils";
import { useChoices } from "../utils/useChoices";
import { FieldWrapper } from "./FieldWrapper";

export type ReferenceFieldProps = BaseSourceProps &
  ReferenceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    search?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    hideLabel?: boolean;
    /** Applied to the underlying Select / input control. */
    inputStyle?: CSSProperties;
    /** Called after the value changes (e.g. to update dependent fields). */
    onValueChange?: (
      value: unknown,
      option: ChoiceOption | undefined,
      meta: { name: string },
    ) => void;
  };

type ReferenceFieldSelectProps = Omit<
  ReferenceFieldProps,
  "source" | "label" | "required" | "rules" | "hideLabel" | "name"
> & {
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
  fieldName: string;
  selectedRecords?: Record<string, unknown> | Record<string, unknown>[];
};

function ReferenceFieldSelect({
  reference,
  choices,
  optionLabel = "name",
  optionValue = "id",
  search,
  allowClear,
  disabled,
  inputStyle,
  onValueChange,
  lazy = true,
  fetchSelected = true,
  value,
  onChange,
  fieldName,
  selectedRecords,
}: ReferenceFieldSelectProps) {
  const [searchText, setSearchText] = useState<string | undefined>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const active = dropdownOpen || Boolean(searchText);
  const selectValue = valueAsId(value, optionValue);

  const { options, loading, optionForValue } = useChoices(
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
      value={selectValue}
      onChange={(next) => {
        onChange(next);
        onValueChange?.(next, optionForValue(next), { name: fieldName });
      }}
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
      style={{ width: "100%", minWidth: 160, ...inputStyle }}
    />
  );
}

export function ReferenceField({
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
  allowClear,
  disabled: disabledProp,
  hideLabel,
  inputStyle,
  onValueChange,
  lazy = true,
  recordSource,
  fetchSelected = true,
}: ReferenceFieldProps) {
  const embeddedRecord = useWatch({
    name: recordSource ?? "",
    disabled: !recordSource,
  }) as Record<string, unknown> | undefined;

  return (
    <FieldWrapper
      source={source}
      name={name}
      label={label}
      required={required}
      rules={rules}
      hideLabel={hideLabel}
    >
      {({ value, onChange, disabled, name: fieldName }) => (
        <ReferenceFieldSelect
          reference={reference}
          choices={choices}
          optionLabel={optionLabel}
          optionValue={optionValue}
          search={search}
          allowClear={allowClear}
          disabled={disabled || disabledProp}
          inputStyle={inputStyle}
          onValueChange={onValueChange}
          lazy={lazy}
          fetchSelected={fetchSelected}
          value={value}
          onChange={onChange}
          fieldName={fieldName}
          selectedRecords={recordSource ? embeddedRecord : undefined}
        />
      )}
    </FieldWrapper>
  );
}
