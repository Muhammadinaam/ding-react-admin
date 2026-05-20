import { Select } from "antd";

import type { CSSProperties } from "react";

import { useMemo, useState } from "react";

import type {

  BaseSourceProps,

  ChoiceOption,

  FieldRules,

  InlineFieldOptions,

  ReferenceProps,

} from "../types";

import { useChoices } from "../utils/useChoices";

import { useInlineOrFormField } from "./useInlineOrFormField";



export type ReferenceFieldProps = BaseSourceProps &

  ReferenceProps &

  InlineFieldOptions & {

    required?: boolean;

    rules?: FieldRules;

    search?: boolean;

    allowClear?: boolean;

    disabled?: boolean;

    /** Applied to the underlying Select / input control. */

    inputStyle?: CSSProperties;

    /** Called after the value changes (e.g. to update dependent fields). */

    onValueChange?: (

      value: unknown,

      option: ChoiceOption | undefined,

      meta: { name?: string; index?: number },

    ) => void;

  };



export function ReferenceField({

  source,

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

  width: inlineWidth,

  minWidth: inlineMinWidth,

  inputStyle,

  onValueChange,

}: ReferenceFieldProps) {

  const [searchText, setSearchText] = useState<string | undefined>();

  const { options, loading, optionForValue } = useChoices(

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

    ({ value, onChange, disabled, name, index }) => (

      <Select

        value={value as string | number | undefined}

        onChange={(next) => {

          onChange(next);

          onValueChange?.(next, optionForValue(next), { name, index });

        }}

        options={selectOptions}

        loading={loading && options.length === 0}

        showSearch={search}

        filterOption={search ? false : undefined}

        onSearch={search ? setSearchText : undefined}

        allowClear={allowClear}

        disabled={disabled || disabledProp}

        optionFilterProp="label"

        style={{ width: "100%", minWidth: 160, ...inputStyle }}

      />

    ),

    { width: inlineWidth, minWidth: inlineMinWidth },

  );



  if (field.mode === "inline") return null;

  return field.element;

}


