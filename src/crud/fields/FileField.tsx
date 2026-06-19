import { DeleteOutlined, PaperClipOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import { useRef } from "react";
import type { BaseSourceProps, FieldRules } from "../types";
import { FieldWrapper } from "./FieldWrapper";
import {
  getUploadFileName,
  hasUploadValue,
  type UploadFieldValue,
} from "./uploadFieldUtils";

export type FileFieldProps = BaseSourceProps & {
  name?: string;
  required?: boolean;
  rules?: FieldRules;
  hideLabel?: boolean;
  /** Allow clearing an existing or newly selected file. */
  clearable?: boolean;
  accept?: string;
};

function FileFieldInput({
  value,
  onChange,
  disabled,
  clearable,
  accept,
}: {
  value: UploadFieldValue;
  onChange: (value: UploadFieldValue) => void;
  disabled?: boolean;
  clearable?: boolean;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileName = getUploadFileName(value);
  const existingUrl = typeof value === "string" && value.length > 0 ? value : undefined;
  const showClear = clearable && hasUploadValue(value);

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {fileName ? (
        <Space>
          <PaperClipOutlined />
          {existingUrl ? (
            <Typography.Link href={existingUrl} target="_blank" rel="noopener noreferrer">
              {fileName}
            </Typography.Link>
          ) : (
            <Typography.Text>{fileName}</Typography.Text>
          )}
        </Space>
      ) : null}
      <Space wrap>
        <Button
          icon={<UploadOutlined />}
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Choose file
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

export function FileField({
  source,
  name,
  label,
  required,
  rules,
  hideLabel,
  clearable,
  accept,
}: FileFieldProps) {
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
        <FileFieldInput
          value={value as UploadFieldValue}
          onChange={onChange}
          disabled={disabled}
          clearable={clearable}
          accept={accept}
        />
      )}
    </FieldWrapper>
  );
}
