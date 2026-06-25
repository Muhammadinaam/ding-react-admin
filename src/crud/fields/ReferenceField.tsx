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
import { valueAsId, resolveOptionLabel } from "../utils/choiceSelectionUtils";
import { referenceSelectNotFoundContent } from "../utils/referenceSelectNotFoundContent";
import { useChoices } from "../utils/useChoices";
import { FieldWrapper } from "./FieldWrapper";
import { ReferenceInputActions } from "./ReferenceInputActions";
import type { ResourcePermissions } from "../../permissions/resourcePermissions";
import type { ReactNode } from "react";

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
    /** Form fields shown in the add/edit modal. Omit to hide action buttons. */
    referenceForm?: ReactNode;
    /** Permissions for add/edit buttons (`add` and `change` slots). */
    referencePermissions?: ResourcePermissions;
    referenceTitle?: string;
    referenceDefaultValues?: Record<string, unknown>;
    referenceModalWidth?: number;
    /** When false, hide add/edit buttons. Default true when `referenceForm` is set. */
    referenceActions?: boolean;
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
  referenceForm,
  referencePermissions,
  referenceTitle,
  referenceDefaultValues,
  referenceModalWidth,
  referenceActions = true,
}: ReferenceFieldSelectProps) {
  const [searchText, setSearchText] = useState<string | undefined>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const active = dropdownOpen || Boolean(searchText);
  const selectValue = valueAsId(value, optionValue);

  const { options, loading, optionForValue, reload } = useChoices(
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

  const applyRecord = (record: Record<string, unknown>) => {
    const id = record[optionValue];
    onChange(id);
    onValueChange?.(
      id,
      {
        label: resolveOptionLabel(record, optionLabel),
        value: id,
        record,
      },
      { name: fieldName },
    );
    void reload();
  };

  const select = (
    <Select
      value={selectValue}
      onChange={(next) => {
        onChange(next);
        onValueChange?.(next, optionForValue(next), { name: fieldName });
      }}
      options={selectOptions}
      loading={loading}
      notFoundContent={referenceSelectNotFoundContent(loading)}
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

  if (!referenceActions) return select;

  return (
    <div style={{ display: "flex", gap: 8, width: "100%", alignItems: "flex-start" }}>
      <div style={{ flex: 1, minWidth: 0 }}>{select}</div>
      <ReferenceInputActions
        reference={reference}
        referenceForm={referenceForm}
        referencePermissions={referencePermissions}
        referenceTitle={referenceTitle}
        referenceDefaultValues={referenceDefaultValues}
        referenceModalWidth={referenceModalWidth}
        selectedId={selectValue}
        disabled={disabled}
        onCreated={applyRecord}
        onUpdated={() => void reload()}
      />
    </div>
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
  referenceForm,
  referencePermissions,
  referenceTitle,
  referenceDefaultValues,
  referenceModalWidth,
  referenceActions = true,
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
          referenceForm={referenceForm}
          referencePermissions={referencePermissions}
          referenceTitle={referenceTitle}
          referenceDefaultValues={referenceDefaultValues}
          referenceModalWidth={referenceModalWidth}
          referenceActions={referenceActions}
        />
      )}
    </FieldWrapper>
  );
}
