import { Space, Typography } from "antd";
import type { ReactNode } from "react";
import { useFilterContext } from "./context/FilterContext";

function FilterBarUI() {
  const ctx = useFilterContext();
  if (!ctx || ctx.filters.length === 0) return null;

  return (
    <Space wrap size="middle" style={{ marginBottom: 16 }}>
      {ctx.filters.map((f) => (
        <Space key={f.key} direction="vertical" size={2}>
          {f.label ? (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {f.label}
            </Typography.Text>
          ) : null}
          {f.render({
            value: ctx.values[f.source],
            onChange: (v) => ctx.setFilterValue(f.source, v),
          })}
        </Space>
      ))}
    </Space>
  );
}

/** Wrap filter field components; renders filter controls above the table. */
export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <FilterBarUI />
    </>
  );
}
