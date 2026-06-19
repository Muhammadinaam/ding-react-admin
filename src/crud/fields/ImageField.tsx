import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Image, Space } from "antd";
import { useRef } from "react";
import type { BaseSourceProps, FieldRules } from "../types";
import { FieldWrapper } from "./FieldWrapper";
import { hasUploadValue, type UploadFieldValue } from "./uploadFieldUtils";
import { useUploadPreviewUrl } from "./useUploadPreviewUrl";

export type ImageFieldProps = BaseSourceProps & {
  name?: string;
  required?: boolean;
  rules?: FieldRules;
  hideLabel?: boolean;
  /** Allow clearing an existing or newly selected image. */
  clearable?: boolean;
  accept?: string;
  /** Max preview width in pixels. */
  previewWidth?: number;
};

function ImageFieldInput({
  value,
  onChange,
  disabled,
  clearable,
  accept = "image/*",
  previewWidth = 200,
}: {
  value: UploadFieldValue;
  onChange: (value: UploadFieldValue) => void;
  disabled?: boolean;
  clearable?: boolean;
  accept?: string;
  previewWidth?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = useUploadPreviewUrl(value);
  const showClear = clearable && hasUploadValue(value);

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt=""
          style={{ maxWidth: previewWidth, maxHeight: previewWidth, objectFit: "contain" }}
        />
      ) : null}
      <Space wrap>
        <Button
          icon={<UploadOutlined />}
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Choose image
        </Button>
        {showClear ? (
          <Button
            icon={<DeleteOutlined />}
            disabled={disabled}
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
          >
            Clear
          </Button>
        ) : null}
      </Space>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          onChange(file ?? null);
          e.target.value = "";
        }}
      />
    </Space>
  );
}

export function ImageField({
  source,
  name,
  label,
  required,
  rules,
  hideLabel,
  clearable,
  accept,
  previewWidth,
}: ImageFieldProps) {
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
        <ImageFieldInput
          value={value as UploadFieldValue}
          onChange={onChange}
          disabled={disabled}
          clearable={clearable}
          accept={accept}
          previewWidth={previewWidth}
        />
      )}
    </FieldWrapper>
  );
}
