import { Button, Card, Space, Table, Typography } from "antd";
import { useFieldArray, useFormContext, useWatch, type FieldValues } from "react-hook-form";
import { useEffect, useMemo, type ReactNode } from "react";
import {
  InlineFormSetProvider,
  useInlineFormSetContext,
  type InlineFormSetLayout,
} from "./context/InlineFormContext";
import type { Identifier } from "../data/dataProviderTypes";
import type { DataProvider } from "../data/dataProviderTypes";
import { inlineArrayName as buildInlineArrayName } from "./utils/inlineArrayName";

export type { InlineFormSetLayout } from "./context/InlineFormContext";

export type InlineFormSetProps = {
  resource: string;
  foreignKey: string;
  label?: string;
  children: ReactNode;
  name?: string;
  /** `tabular` (default) — Django TabularInline; `stacked` — Django StackedInline. */
  layout?: InlineFormSetLayout;
};

function useInlineRows(arrayName: string) {
  const ctx = useInlineFormSetContext();
  const { control } = useFormContext<FieldValues>();
  const watchedRows = useWatch({ control, name: arrayName });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: arrayName,
  });

  useEffect(() => {
    if (!Array.isArray(watchedRows) || watchedRows.length === 0) return;
    if (fields.length === watchedRows.length) return;
    replace(watchedRows);
  }, [watchedRows, fields.length, replace]);

  const appendEmpty = () => {
    if (!ctx) return;
    const empty: Record<string, unknown> = {};
    for (const f of ctx.fields) empty[f.source] = undefined;
    append(empty);
  };

  return { ctx, fields, remove, appendEmpty };
}

function InlineFormSetTable({
  arrayName,
  label,
}: {
  arrayName: string;
  label?: string;
}) {
  const { ctx, fields, remove, appendEmpty } = useInlineRows(arrayName);

  const columns = useMemo(() => {
    if (!ctx) return [];
    return ctx.fields.map((f) => ({
      title: f.label ?? f.source,
      key: f.source,
      width: f.width,
      onHeaderCell: () =>
        f.minWidth != null
          ? { style: { minWidth: f.minWidth } }
          : {},
      onCell: () =>
        f.minWidth != null ? { style: { minWidth: f.minWidth } } : {},
      render: (_: unknown, __: unknown, index: number) =>
        f.render({ name: `${arrayName}.${index}.${f.source}`, index }),
    }));
  }, [ctx, arrayName]);

  if (!ctx) return null;

  return (
    <div style={{ marginTop: 24 }}>
      <Typography.Title level={5}>{label ?? "Related items"}</Typography.Title>
      <Table
        size="small"
        pagination={false}
        scroll={{ x: "max-content" }}
        dataSource={fields.map((f) => ({ ...f, key: f.id }))}
        columns={[
          ...columns,
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

function InlineFormSetStacked({
  arrayName,
  label,
}: {
  arrayName: string;
  label?: string;
}) {
  const { ctx, fields, remove, appendEmpty } = useInlineRows(arrayName);

  if (!ctx) return null;

  return (
    <div style={{ marginTop: 24 }}>
      <Typography.Title level={5}>{label ?? "Related items"}</Typography.Title>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {fields.map((field, index) => (
          <Card
            key={field.id}
            size="small"
            title={`Item ${index + 1}`}
            extra={
              <Button type="link" danger size="small" onClick={() => remove(index)}>
                Remove
              </Button>
            }
          >
            {ctx.fields.map((f) => (
              <div key={f.source}>
                {f.render({
                  name: `${arrayName}.${index}.${f.source}`,
                  index,
                })}
              </div>
            ))}
          </Card>
        ))}
      </Space>
      <Button type="dashed" style={{ marginTop: 8 }} onClick={appendEmpty}>
        Add item
      </Button>
    </div>
  );
}

export function InlineFormSet({
  resource,
  label,
  children,
  name,
  layout = "tabular",
}: InlineFormSetProps) {
  const arrayName = buildInlineArrayName(resource, name);

  return (
    <InlineFormSetProvider arrayName={arrayName} layout={layout}>
      {children}
      {layout === "stacked" ? (
        <InlineFormSetStacked arrayName={arrayName} label={label} />
      ) : (
        <InlineFormSetTable arrayName={arrayName} label={label} />
      )}
    </InlineFormSetProvider>
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
