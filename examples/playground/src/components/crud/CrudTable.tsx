import { Button, Card, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDataProvider, usePermissions } from "ding-react-admin";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export type CrudTableProps<T extends Record<string, unknown>> = {
  resource: string;
  title: string;
  columns: ColumnsType<T>;
  /** e.g. `/products` → edit `/products/:id`, new defaults to `/products/new`. */
  pathPrefix: string;
  /** Override create URL (e.g. `/invoice-lines/new?invoiceId=5`). */
  newPath?: string;
  /** Extra GET list filters (e.g. invoice lines for one invoice). */
  filter?: Record<string, unknown>;
};

export function CrudTable<T extends Record<string, unknown>>({
  resource,
  title,
  columns,
  pathPrefix,
  newPath,
  filter,
}: CrudTableProps<T>) {
  const dp = useDataProvider();
  const can = usePermissions();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<T[]>([]);

  const createHref = newPath ?? `${pathPrefix}/new`;

  const handleDelete = useCallback(
    async (row: T) => {
      if (!can("delete", resource)) return;
      const rowId = row.id as string | number;
      try {
        await dp.delete(resource, rowId);
        const f = filter ? { ...filter } : undefined;
        const res = await dp.getList(resource, {
          pagination: { page, perPage: pageSize },
          filter: f,
        });
        setData(res.data as T[]);
        setTotal(res.total);
      } catch (e) {
        console.error(e);
      }
    },
    [can, dp, resource, page, pageSize, filter],
  );

  const filterKey = useMemo(() => JSON.stringify(filter ?? {}), [filter]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const f = filter ? { ...filter } : undefined;
      const res = await dp.getList(resource, {
        pagination: { page, perPage: pageSize },
        filter: f,
      });
      setData(res.data as T[]);
      setTotal(res.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [dp, resource, page, pageSize, filter, filterKey]);

  useEffect(() => {
    void load();
  }, [load]);

  const write = can("write", resource);
  const del = can("delete", resource);

  const mergedColumns = useMemo(() => {
    const action: ColumnsType<T>[0] = {
      title: "Actions",
      key: "__actions",
      width: 160,
      render: (_, row) => (
        <Space size="small" wrap>
          {write ? (
            <Link to={`${pathPrefix}/${String(row.id)}`}>Edit</Link>
          ) : null}
          {del ? (
            <Button
              type="link"
              danger
              size="small"
              onClick={() => void handleDelete(row)}
              style={{ padding: 0 }}
            >
              Delete
            </Button>
          ) : null}
        </Space>
      ),
    };
    if (!write && !del) return columns;
    return [...columns, action];
  }, [columns, write, del, pathPrefix, handleDelete]);

  return (
    <Card
      title={
        <Typography.Title level={5} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
      }
      extra={
        write ? (
          <Link to={createHref}>
            <Button type="primary">New</Button>
          </Link>
        ) : null
      }
    >
      <Table<T>
        rowKey="id"
        loading={loading}
        columns={mergedColumns}
        dataSource={data}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          onChange: (p, ps) => {
            setPage(p);
            if (ps) setPageSize(ps);
          },
        }}
      />
    </Card>
  );
}
