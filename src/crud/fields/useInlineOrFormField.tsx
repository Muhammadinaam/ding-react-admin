import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { useInlineFormSetContext } from "../context/InlineFormContext";
import type {
  FieldRenderProps,
  FieldRules,
  InlineFieldDefinition,
  InlineFieldOptions,
} from "../types";
import { FieldWrapper, InlineFieldWrapper } from "./FieldWrapper";

export function useInlineOrFormField(
  source: string,
  label: string | undefined,
  required: boolean | undefined,
  rules: FieldRules | undefined,
  renderInput: (props: FieldRenderProps) => ReactNode,
  inlineOptions?: InlineFieldOptions,
) {
  const inlineCtx = useInlineFormSetContext();
  const registerField = inlineCtx?.registerField;
  const isInline = registerField != null;
  const renderInputRef = useRef(renderInput);
  renderInputRef.current = renderInput;

  const inlineDef = useMemo((): InlineFieldDefinition | null => {
    if (!registerField) return null;
    return {
      key: source,
      source,
      label,
      width: inlineOptions?.width,
      minWidth: inlineOptions?.minWidth,
      render: ({ name, index }) => (
        <InlineFieldWrapper
          name={name}
          label={label}
          required={required}
          rules={rules}
          hideLabel={inlineCtx?.layout !== "stacked"}
        >
          {({ value, onChange, onBlur }) =>
            renderInputRef.current({
              value,
              onChange,
              onBlur,
              name,
              index,
            })
          }
        </InlineFieldWrapper>
      ),
    };
  }, [
    registerField,
    source,
    label,
    required,
    rules,
    inlineCtx?.layout,
    inlineOptions?.width,
    inlineOptions?.minWidth,
  ]);

  const inlineDefRef = useRef(inlineDef);
  inlineDefRef.current = inlineDef;

  useEffect(() => {
    if (!registerField) return;
    const def = inlineDefRef.current;
    if (!def) return;
    return registerField(def);
  }, [registerField, source]);

  if (isInline) return { mode: "inline" as const };

  return {
    mode: "form" as const,
    element: (
      <FieldWrapper
        source={source}
        label={label}
        required={required}
        rules={rules}
      >
        {({ value, onChange, onBlur, disabled }) =>
          renderInput({ value, onChange, onBlur, disabled })
        }
      </FieldWrapper>
    ),
  };
}
