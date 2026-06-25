import { Select } from "antd";
import { useMemo, useState } from "react";
import type { BaseSourceProps, ChoiceOption, ReferenceProps } from "../types";
import { useRegisterFilter } from "../context/FilterContext";
import { useChoices } from "../utils/useChoices";
import { referenceSelectNotFoundContent } from "../utils/referenceSelectNotFoundContent";

export type SelectFilterProps = BaseSourceProps & {
  choices: ChoiceOption[];
  multiple?: boolean;
};

function SelectFilterInput({
  source,
  label,
  choices,
  multiple,
  value,
  onChange,
}: SelectFilterProps & {
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  return (
    <Select
      allowClear
      mode={multiple ? "multiple" : undefined}
      placeholder={label ?? source}
      value={value as string | number | (string | number)[] | undefined}
      onChange={onChange}
      options={choices}
      style={{ minWidth: 160 }}
    />
  );
}

export function SelectFilter({
  source,
  label,
  choices,
  multiple,
}: SelectFilterProps) {
  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      render: ({
        value,
        onChange,
      }: {
        value: unknown;
        onChange: (value: unknown) => void;
      }) => (
        <SelectFilterInput
          source={source}
          label={label}
          choices={choices}
          multiple={multiple}
          value={value}
          onChange={onChange}
        />
      ),
    }),
    [source, label, choices, multiple],
  );
  useRegisterFilter(def);
  return null;
}

export type ReferenceFilterProps = BaseSourceProps &
  ReferenceProps & {
    multiple?: boolean;
    search?: boolean;
  };

function ReferenceFilterInput({
  source,
  label,
  reference,
  choices,
  optionLabel,
  optionValue,
  multiple,
  search,
  lazy = true,
  fetchSelected = true,
  value,
  onChange,
}: ReferenceFilterProps & {
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const [searchText, setSearchText] = useState<string | undefined>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const active = dropdownOpen || Boolean(searchText);

  const { options, loading } = useChoices(
    choices,
    reference,
    optionLabel,
    optionValue,
    search ? searchText : undefined,
    { lazy, active, selectedValues: value, fetchSelected },
  );

  return (
    <Select
      allowClear
      mode={multiple ? "multiple" : undefined}
      placeholder={label ?? source}
      value={value as string | number | (string | number)[] | undefined}
      onChange={onChange}
      options={options.map((o) => ({
        label: o.label,
        value: o.value as string | number,
      }))}
      loading={loading}
      notFoundContent={referenceSelectNotFoundContent(loading)}
      showSearch={search}
      filterOption={search ? false : undefined}
      onSearch={search ? setSearchText : undefined}
      onDropdownVisibleChange={(open) => {
        setDropdownOpen(open);
        if (!open) setSearchText(undefined);
      }}
      optionFilterProp="label"
      style={{ minWidth: 180 }}
    />
  );
}

export function ReferenceFilter({
  source,
  label,
  reference,
  choices,
  optionLabel = "name",
  optionValue = "id",
  multiple,
  search,
  lazy = true,
  fetchSelected = true,
}: ReferenceFilterProps) {
  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      render: ({
        value,
        onChange,
      }: {
        value: unknown;
        onChange: (value: unknown) => void;
      }) => (
        <ReferenceFilterInput
          source={source}
          label={label}
          reference={reference}
          choices={choices}
          optionLabel={optionLabel}
          optionValue={optionValue}
          multiple={multiple}
          search={search}
          lazy={lazy}
          fetchSelected={fetchSelected}
          value={value}
          onChange={onChange}
        />
      ),
    }),
    [
      source,
      label,
      reference,
      choices,
      optionLabel,
      optionValue,
      multiple,
      search,
      lazy,
      fetchSelected,
    ],
  );
  useRegisterFilter(def);
  return null;
}

export function ReferenceManyFilter(props: ReferenceFilterProps) {
  return <ReferenceFilter {...props} multiple />;
}
