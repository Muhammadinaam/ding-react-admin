import { Button, Card, Space, Table, Typography } from "antd";
import { useFieldArray, useFormContext, type FieldValues } from "react-hook-form";
import { useMemo, type ReactNode } from "react";
import type { Identifier } from "../data/dataProviderTypes";
import type { DataProvider } from "../data/dataProviderTypes";
import type {
  InlineColumnDef,
  InlineFormSetBaseProps,
  InlineRowContext,
} from "./types";
import { inlineArrayName as buildInlineArrayName } from "./utils/inlineArrayName";
import { inlineFieldName } from "./utils/inlineFieldName";

export type InlineFormSetLayout = "tabular" | "stacked";

export type InlineFormSetProps = InlineFormSetBaseProps & {
  columns: InlineColumnDef[];
};

export type InlineFormSetStackedProps = InlineFormSetBaseProps & {
  /** Field sources in each row — used when appending an empty row. */
  sources: string[];
  renderRow: (ctx: InlineRowContext) => ReactNode;
};

function emptyRow(sources: string[]) {
  const row: Record<string, unknown> = {};
  for (const source of sources) row[source] = undefined;
  return row;
}

function useInlineRows(arrayName: string, sources: string[]) {
  const { control } = useFormContext<FieldValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: arrayName,
  });

  const appendEmpty = () => append(emptyRow(sources));

  return { fields, remove, appendEmpty };
}

/** Tabular inline (Django TabularInline) — table with column headers. */
export function InlineFormSet({
  resource,
  label,
  name,
  columns,
}: InlineFormSetProps) {
  const arrayName = buildInlineArrayName(resource, name);
  const sources = useMemo(
    () => columns.map((col) => col.source),
    [columns],
  );
  const { fields, remove, appendEmpty } = useInlineRows(arrayName, sources);

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
            name: inlineFieldName(arrayName, index, col.source),
            index,
            arrayName,
          }),
      })),
    [columns, arrayName],
  );

  return (
    <div style={{ marginTop: 24 }}>
      <Typography.Title level={5}>{label ?? "Related items"}</Typography.Title>
      <Table
        size="small"
        pagination={false}
        scroll={{ x: "max-content" }}
        dataSource={fields.map((f) => ({ ...f, key: f.id }))}
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
  resource,
  label,
  name,
  sources,
  renderRow,
}: InlineFormSetStackedProps) {
  const arrayName = buildInlineArrayName(resource, name);
  const { fields, remove, appendEmpty } = useInlineRows(arrayName, sources);

  return (
    <div style={{ marginTop: 24 }}>
      <Typography.Title level={5}>{label ?? "Related items"}</Typography.Title>
      <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
        {fields.map((field, index) => (
          <Card
            key={field.id}
            size="small"
            title={`Item ${index + 1}`}
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
            {renderRow({
              arrayName,
              index,
              name: (source) => inlineFieldName(arrayName, index, source),
            })}
          </Card>
        ))}
      </Space>
      <Button type="dashed" style={{ marginTop: 8 }} onClick={appendEmpty}>
        Add item
      </Button>
    </div>
  );
}

export type SaveInlineOptions = {
  resource: string;
  foreignKey: string;
  parentId: Identifier;
  rows: Record<string, unknown>[];
  existingIds?: Identifier[];
  /** Return true when the error was handled (field errors applied). Stops saving further rows. */
  onRowError?: (error: unknown, index: number) => boolean;
};

export async function saveInlineRows(
  dp: DataProvider,
  opts: SaveInlineOptions,
): Promise<boolean> {
  const { resource, foreignKey, parentId, rows, existingIds = [], onRowError } =
    opts;
  const keptIds: Identifier[] = [];

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    try {
      const { id: _id, ...rest } = row;
      const data = { ...rest, [foreignKey]: parentId };
      const rowId = row.id as Identifier | undefined;
      if (rowId != null && existingIds.some((e) => e === rowId)) {
        await dp.update(resource, { id: rowId, data });
        keptIds.push(rowId);
      } else {
        const res = await dp.create(resource, data);
        const created = res.data as { id: Identifier };
        keptIds.push(created.id);
      }
    } catch (e) {
      if (onRowError?.(e, index)) return false;
      throw e;
    }
  }

  for (const oldId of existingIds) {
    if (!keptIds.some((k) => k === oldId)) {
      await dp.delete(resource, oldId);
    }
  }

  return true;
}

export async function loadInlineRows(
  dp: DataProvider,
  resource: string,
  foreignKey: string,
  parentId: Identifier,
) {
  const res = await dp.getList(resource, {
    filter: { [foreignKey]: Number(parentId) || parentId },
    pagination: { page: 1, perPage: 500 },
  });
  return {
    rows: res.data as Record<string, unknown>[],
    ids: (res.data as { id: Identifier }[]).map((r) => r.id),
  };
}
