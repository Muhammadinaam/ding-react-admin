import { SearchOutlined } from "@ant-design/icons";
import { Input, theme } from "antd";
import type { ChangeEvent } from "react";

export type NavMenuSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Lighter styling for the classic dark navy sidebar. */
  variant?: "on-dark" | "app";
};

export function NavMenuSearch({
  value,
  onChange,
  placeholder = "Search menu…",
  variant = "on-dark",
}: NavMenuSearchProps) {
  const { token } = theme.useToken();
  const onDark = variant === "on-dark";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      style={{
        flexShrink: 0,
        paddingInline: token.paddingSM,
        paddingBlock: token.paddingXS,
      }}
    >
      <Input
        allowClear
        size="small"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        prefix={
          <SearchOutlined
            style={{
              color: onDark
                ? "rgba(255, 255, 255, 0.45)"
                : token.colorTextDescription,
            }}
          />
        }
        aria-label={placeholder}
        styles={{
          input: onDark
            ? { color: "rgba(255, 255, 255, 0.88)" }
            : undefined,
        }}
        style={{
          background: onDark
            ? "rgba(255, 255, 255, 0.08)"
            : token.colorFillTertiary,
          borderColor: "transparent",
          boxShadow: "none",
        }}
      />
    </div>
  );
}
