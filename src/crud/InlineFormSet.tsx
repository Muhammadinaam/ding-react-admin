import { Button, Card, Space, Table, Typography } from "antd";
import { useFieldArray, useFormContext, type FieldValues } from "react-hook-form";
import { useMemo, type ReactNode } from "react";
import type {
  InlineColumnDef,
  InlineFormSetBaseProps,
  InlineRowContext,
} from "./types";
import { nestedFieldPath } from "./utils/nestedFieldPath";
import { useRegisterInlineField } from "./context/InlineFieldsRegistry";
import { useRegisterPayloadField } from "./context/PayloadFieldsContext";

export type InlineFormSetLayout = "tabular" | "stacked";

export type InlineFormSetProps = InlineFormSetBaseProps & {
  columns: InlineColumnDef[];
};

export type InlineFormSetStackedProps = InlineFormSetBaseProps & {
  /** Field sources in each row — used when appending an empty row. */
  sources: string[];
  renderRow: (ctx: InlineRowContext) => ReactNode;
  /** Optional card title per row (defaults to "Item N"). */
  getCardTitle?: (ctx: InlineRowContext) => ReactNode;
  /** Optional content below the row list (e.g. combined preview). */
  footer?: ReactNode;
};

function emptyRow(sources: string[], defaults?: Record<string, unknown>) {
  const row: Record<string, unknown> = {};
  for (const source of sources) {
    row[source] = defaults?.[source] ?? undefined;
  }
  return row;
}

function useInlineRows(
  field: string,
  sources: string[],
  defaultRow?: Record<string, unknown>,
) {
  const { control } = useFormContext<FieldValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: field,
    keyName: "rowKey",
  });

  const appendEmpty = () => append(emptyRow(sources, defaultRow));

  return { fields, remove, appendEmpty };
}

/** Tabular inline (Django TabularInline) — table with column headers. */
export function InlineFormSet({
  field,
  label,
  payloadKey,
  transformRows,
  columns,
  defaultRow,
}: InlineFormSetProps) {
  const sources = useMemo(
    () => columns.map((col) => col.source),
    [columns],
  );
  const { fields, remove, appendEmpty } = useInlineRows(field, sources, defaultRow);

  useRegisterPayloadField(field);
  useRegisterInlineField(field, sources, payloadKey, transformRows);

  const tableColumns = useMemo(
    () =>
      columns.map((col) => ({
        title: col.label ?? col.source,
        key: col.source,
        width: col.width,
        onHeaderCell: () =>
          col.minWidth != null ? { style: { minWidth: col.minWidth } } : {},
        onCell: () =>
          col.minWidth != null ? { style: { minWidth: col.minWidth } } : {},
        render: (_: unknown, __: unknown, index: number) =>
          col.cell({
            name: nestedFieldPath(field, index, col.source),
            index,
            field,
          }),
      })),
    [columns, field],
  );

  return (
    <div style={{ marginTop: 24 }}>
      <Typography.Title level={5}>{label ?? "Related items"}</Typography.Title>
      <Table
        size="small"
        pagination={false}
        scroll={{ x: "max-content" }}
        dataSource={fields.map((f) => ({ ...f, key: f.rowKey }))}
        columns={[
          ...tableColumns,
          {
            title: "",
            key: "__remove",
            width: 80,
            render: (_: unknown, __: unknown, index: number) => (
              <Button
                type="link"
                danger
                size="small"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            ),
          },
        ]}
      />
      <Button type="dashed" style={{ marginTop: 8 }} onClick={appendEmpty}>
        Add row
      </Button>
    </div>
  );
}

/** Stacked inline (Django StackedInline) — each row in a card with field labels. */
export function InlineFormSetStacked({
  field,
  label,
  payloadKey,
  transformRows,
  sources,
  renderRow,
  getCardTitle,
  footer,
  defaultRow,
}: InlineFormSetStackedProps) {
  const { fields, remove, appendEmpty } = useInlineRows(field, sources, defaultRow);

  useRegisterPayloadField(field);
  useRegisterInlineField(field, sources, payloadKey, transformRows);

  return (
    <div style={{ marginTop: 24 }}>
      <Typography.Title level={5}>{label ?? "Related items"}</Typography.Title>
      <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
        {fields.map((rowField, index) => {
          const rowContext = {
            field,
            index,
            name: (source: string) => nestedFieldPath(field, index, source),
          };
          return (
          <Card
            key={rowField.rowKey}
            size="small"
            title={getCardTitle?.(rowContext) ?? `Item ${index + 1}`}
            extra={
              <Button
                type="link"
                danger
                size="small"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            }
          >
            {renderRow(rowContext)}
          </Card>
          );
        })}
      </Space>
      <Button type="dashed" style={{ marginTop: 8 }} onClick={appendEmpty}>
        Add item
      </Button>
      {footer}
    </div>
  );
}
