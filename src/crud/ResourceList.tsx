import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { App, Button, Card, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type {
  SortOrder as AntSortOrder,
  SorterResult,
} from "antd/es/table/interface";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { useDataProvider } from "../context/DataProvider";
import { usePermissions } from "../context/PermissionsProvider";
import { ListContextProvider, useListContext } from "./context/ListContext";
import { FilterContextProvider } from "./context/FilterContext";
import { ResourceFormModal } from "./ResourceFormModal";
import type {
  EditMode,
  ResourceListBuiltInActions,
  ResourceListRowActionsHelpers,
} from "./types";
import { useListQueryState } from "./utils/useListQueryState";

type ResourceListContextValue = {
  filterValues: Record<string, unknown>;
  setFilterValue: (source: string, value: unknown) => void;
};

const ResourceListContext = createContext<ResourceListContextValue | null>(
  null,
);

export function useResourceListContext() {
  return useContext(ResourceListContext);
}

export type ResourceListProps = {
  resource: string;
  title: string;
  pathPrefix: string;
  newPath?: string;
  /** Merged into every list request (not synced to URL). */
  staticFilter?: Record<string, unknown>;
  editMode?: EditMode;
  syncQueryParams?: boolean;
  children: ReactNode;
  /** Form fields rendered inside create/edit modal. */
  formChildren?: ReactNode;
  /** Show/hide built-in Edit, Quick edit, and Delete actions (permissions still apply). */
  actions?: ResourceListBuiltInActions;
  /** Extra row actions rendered after built-in ones in the Actions column. */
  rowActions?: (
    row: Record<string, unknown>,
    helpers: ResourceListRowActionsHelpers,
  ) => ReactNode;
  /** Extra card header content, rendered before New / New page buttons. */
  headerExtra?: ReactNode;
};

function ResourceListTable<T extends Record<string, unknown>>({
  resource,
  title,
  pathPrefix,
  newPath,
  editMode = "page",
  formChildren,
  actions: actionsConfig,
  rowActions,
  headerExtra,
  queryState,
  queryActions,
}: {
  resource: string;
  title: string;
  pathPrefix: string;
  newPath?: string;
  editMode?: EditMode;
  formChildren?: ReactNode;
  actions?: ResourceListBuiltInActions;
  rowActions?: (
    row: Record<string, unknown>,
    helpers: ResourceListRowActionsHelpers,
  ) => ReactNode;
  headerExtra?: ReactNode;
  queryState: ReturnType<typeof useListQueryState>[0];
  queryActions: ReturnType<typeof useListQueryState>[1];
}) {
  const dp = useDataProvider();
  const can = usePermissions();
  const { message } = App.useApp();
  const { columns, sortOrders, sortPriorities } = useListContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);

  const createHref = newPath ?? `${pathPrefix}/new`;
  const write = can("write", resource);
  const del = can("delete", resource);
  const showEdit =
    write &&
    (editMode === "page" || editMode === "both") &&
    actionsConfig?.edit !== false;
  const showQuickEdit =
    write &&
    (editMode === "modal" || editMode === "both") &&
    actionsConfig?.quickEdit !== false;
  const showDelete = del && actionsConfig?.delete !== false;
  const showActionsColumn = showEdit || showQuickEdit || showDelete || rowActions;

  const handleTableSortChange = useCallback(
    (sorter: SorterResult<T> | SorterResult<T>[]) => {
      const resolveField = (entry: SorterResult<T> | undefined) => {
        const raw = entry?.columnKey ?? entry?.field;
        if (raw == null) return null;
        return String(Array.isArray(raw) ? raw[0] : raw);
      };

      if (Array.isArray(sorter)) {
        const active = sorter.find((entry) => entry?.order);
        if (active) {
          const field = resolveField(active);
          if (field) queryActions.toggleSort(field);
          return;
        }
        if (queryState.sort.length > 0) queryActions.setSort([]);
        return;
      }

      const field = resolveField(sorter);
      if (field) {
        queryActions.toggleSort(field);
        return;
      }

      // Ant Design "cancel sort" omits field/order (legacy generateSorterInfo).
      if (!sorter?.order && queryState.sort.length > 0) {
        queryActions.setSort([]);
      }
    },
    [queryActions, queryState.sort.length],
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const sort =
        queryState.sort.length === 0
          ? undefined
          : queryState.sort.length === 1
            ? queryState.sort[0]
            : queryState.sort;
      const res = await dp.getList(resource, {
        pagination: { page: queryState.page, perPage: queryState.perPage },
        sort,
        filter: queryState.filter,
      });
      setData(res.data as T[]);
      setTotal(res.total);
    } catch (e) {
      message.error(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [dp, resource, queryState, message]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleDelete = useCallback(
    async (row: T) => {
      if (!can("delete", resource)) return;
      try {
        await dp.delete(resource, row.id as string | number);
        message.success("Deleted");
        void load();
      } catch (e) {
        message.error(e instanceof Error ? e.message : "Delete failed");
      }
    },
    [can, dp, resource, load, message],
  );

  const tableColumns = useMemo((): ColumnsType<T> => {
    const built = columns.map((c) => {
      const col = c.buildColumn() as ColumnsType<T>[number];
      if (c.sortable) {
        const order = sortOrders.get(c.source);
        const priority = sortPriorities.get(c.source);
        const antOrder: AntSortOrder | undefined =
          order === "ASC"
            ? "ascend"
            : order === "DESC"
              ? "descend"
              : undefined;
        const sortedIcon =
          antOrder != null ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                marginInlineStart: 4,
                color: "var(--ant-color-primary)",
              }}
            >
              {priority != null ? (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    lineHeight: 1,
                    minWidth: 10,
                    textAlign: "center",
                  }}
                >
                  {priority}
                </span>
              ) : null}
              {antOrder === "ascend" ? (
                <CaretUpOutlined style={{ fontSize: 11 }} />
              ) : (
                <CaretDownOutlined style={{ fontSize: 11 }} />
              )}
            </span>
          ) : undefined;
        return {
          ...col,
          sorter: true,
          sortOrder: antOrder,
          ...(sortedIcon ? { sortIcon: () => sortedIcon } : {}),
        };
      }
      return col;
    });

    if (!showActionsColumn) return built;

    const rowHelpers: ResourceListRowActionsHelpers = {
      reload: () => void load(),
      openEditModal: queryActions.openEditModal,
    };

    const action: ColumnsType<T>[number] = {
      title: "Actions",
      key: "__actions",
      width: editMode === "both" ? 200 : 160,
      render: (_, row) => (
        <Space size="small" wrap>
          {showEdit ? (
            <Link to={`${pathPrefix}/${String(row.id)}`}>Edit</Link>
          ) : null}
          {showQuickEdit ? (
            <Button
              type="link"
              size="small"
              style={{ padding: 0 }}
              onClick={() =>
                queryActions.openEditModal(row.id as string | number)
              }
            >
              {editMode === "both" ? "Quick edit" : "Edit"}
            </Button>
          ) : null}
          {showDelete ? (
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
          {rowActions?.(row, rowHelpers)}
        </Space>
      ),
    };
    return [...built, action];
  }, [
    columns,
    showActionsColumn,
    showEdit,
    showQuickEdit,
    showDelete,
    editMode,
    pathPrefix,
    handleDelete,
    sortOrders,
    sortPriorities,
    queryActions,
    rowActions,
    load,
  ]);

  const showModal =
    formChildren &&
    (queryState.createModal || queryState.editId != null) &&
    (editMode === "modal" || editMode === "both");

  return (
    <>
      <Card
        title={
          <Typography.Title level={5} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
        }
        extra={
          (headerExtra || write) ? (
            <Space>
              {headerExtra}
              {write ? (
                editMode === "modal" || editMode === "both" ? (
                  <>
                    {editMode === "both" ? (
                      <Link to={createHref}>
                        <Button>New page</Button>
                      </Link>
                    ) : null}
                    <Button
                      type="primary"
                      onClick={() => queryActions.openCreateModal()}
                    >
                      New
                    </Button>
                  </>
                ) : (
                  <Link to={createHref}>
                    <Button type="primary">New</Button>
                  </Link>
                )
              ) : null}
            </Space>
          ) : null
        }
      >
        <Table<T>
          rowKey="id"
          loading={loading}
          columns={tableColumns}
          dataSource={data}
          pagination={{
            current: queryState.page,
            pageSize: queryState.perPage,
            total,
            showSizeChanger: true,
            onChange: (p, ps) => {
              queryActions.setPage(p);
              if (ps) queryActions.setPerPage(ps);
            },
          }}
          onChange={(_pag, _filters, sorter) => {
            handleTableSortChange(sorter as SorterResult<T> | SorterResult<T>[]);
          }}
        />
      </Card>
      {showModal ? (
        <ResourceFormModal
          resource={resource}
          editId={queryState.createModal ? "new" : queryState.editId}
          onClose={() => {
            queryActions.closeModal();
            void load();
          }}
        >
          {formChildren}
        </ResourceFormModal>
      ) : null}
    </>
  );
}

export function ResourceList({
  resource,
  title,
  pathPrefix,
  newPath,
  staticFilter,
  editMode = "page",
  syncQueryParams = true,
  children,
  formChildren,
  actions,
  rowActions,
  headerExtra,
}: ResourceListProps) {
  const [queryState, queryActions] = useListQueryState(staticFilter);

  const filterValues = useMemo(() => {
    if (!syncQueryParams) return staticFilter ?? {};
    const vals: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(queryState.filter)) {
      if (staticFilter && k in staticFilter) continue;
      vals[k] = v;
    }
    return vals;
  }, [queryState.filter, staticFilter, syncQueryParams]);

  const setFilterValue = useCallback(
    (source: string, value: unknown) => {
      if (syncQueryParams) {
        queryActions.setFilter(source, value);
      }
    },
    [syncQueryParams, queryActions],
  );

  const listCtx = useMemo(
    (): ResourceListContextValue => ({ filterValues, setFilterValue }),
    [filterValues, setFilterValue],
  );

  return (
    <ResourceListContext.Provider value={listCtx}>
      <FilterContextProvider values={filterValues} setFilterValue={setFilterValue}>
        <ListContextProvider
          toggleSort={queryActions.toggleSort}
          sort={queryState.sort}
        >
          {children}
          <ResourceListTable
            resource={resource}
            title={title}
            pathPrefix={pathPrefix}
            newPath={newPath}
            editMode={editMode}
            formChildren={formChildren}
            actions={actions}
            rowActions={rowActions}
            headerExtra={headerExtra}
            queryState={queryState}
            queryActions={queryActions}
          />
        </ListContextProvider>
      </FilterContextProvider>
    </ResourceListContext.Provider>
  );
}
