import { Select } from "antd";
import { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import type { BaseSourceProps, FieldRules, ReferenceProps } from "../types";
import { valuesAsIds } from "../utils/choiceSelectionUtils";
import { referenceSelectNotFoundContent } from "../utils/referenceSelectNotFoundContent";
import { useChoices } from "../utils/useChoices";
import { FieldWrapper } from "./FieldWrapper";
import { ReferenceInputActions } from "./ReferenceInputActions";
import type { ResourcePermissions } from "../../permissions/resourcePermissions";
import type { ReactNode } from "react";

export type ReferenceManyFieldProps = BaseSourceProps &
  ReferenceProps & {
    name?: string;
    required?: boolean;
    rules?: FieldRules;
    search?: boolean;
    allowClear?: boolean;
    hideLabel?: boolean;
    referenceForm?: ReactNode;
    referencePermissions?: ResourcePermissions;
    referenceTitle?: string;
    referenceDefaultValues?: Record<string, unknown>;
    referenceModalWidth?: number;
    /** When false, hide add button even if catalog defines a form. Default true. */
    referenceActions?: boolean;
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
  referenceForm,
  referencePermissions,
  referenceTitle,
  referenceDefaultValues,
  referenceModalWidth,
  referenceActions = true,
}: ReferenceManyFieldSelectProps) {
  const [searchText, setSearchText] = useState<string | undefined>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const active = dropdownOpen || Boolean(searchText);
  const selectValue = valuesAsIds(value, optionValue);

  const { options, loading, reload } = useChoices(
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

  const select = (
    <Select
      mode="multiple"
      value={selectValue}
      onChange={onChange}
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
      style={{ width: "100%" }}
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
        disabled={disabled}
        onCreated={(record) => {
          const id = record[optionValue];
          const current = Array.isArray(selectValue) ? selectValue : [];
          if (current.some((v) => v === id)) {
            void reload();
            return;
          }
          onChange([...current, id]);
          void reload();
        }}
      />
    </div>
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
  referenceForm,
  referencePermissions,
  referenceTitle,
  referenceDefaultValues,
  referenceModalWidth,
  referenceActions = true,
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
