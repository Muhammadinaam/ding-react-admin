import { Select } from "antd";
import { useMemo, useState } from "react";
import type { BaseSourceProps, ChoiceOption, ReferenceProps } from "../types";
import { useRegisterFilter } from "../context/FilterContext";
import { useChoices } from "../utils/useChoices";

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
  value,
  onChange,
}: ReferenceFilterProps & {
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const [searchText, setSearchText] = useState<string | undefined>();
  const { options, loading } = useChoices(
    choices,
    reference,
    optionLabel,
    optionValue,
    search ? searchText : undefined,
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
      showSearch={search}
      filterOption={search ? false : undefined}
      onSearch={search ? setSearchText : undefined}
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
    ],
  );
  useRegisterFilter(def);
  return null;
}

export function ReferenceManyFilter(props: ReferenceFilterProps) {
  return <ReferenceFilter {...props} multiple />;
}
