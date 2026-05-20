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
  type Key,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { useDataProvider } from "../context/DataProvider";
import { usePermissions } from "../context/PermissionsProvider";
import { ListContextProvider, useListContext } from "./context/ListContext";
import { FilterContextProvider } from "./context/FilterContext";
import { ResourceFormModal } from "./ResourceFormModal";
import { ListActionsBar } from "./ListActionsBar";
import type {
  EditMode,
  ResourceListBuiltInActions,
  ResourceListBulkAction,
  ResourceListBulkActionHelpers,
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
  /** Extra bulk actions in the Django-style action bar (appended after built-ins). */
  bulkActions?: ResourceListBulkAction[];
  /** Show built-in "Delete selected" when user has delete permission. Default true. */
  bulkDelete?: boolean;
  /** Set false to hide row checkboxes and the bulk action bar. Default true. */
  bulkActionsEnabled?: boolean;
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
  bulkActions: bulkActionsProp,
  bulkDelete = true,
  bulkActionsEnabled = true,
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
  bulkActions?: ResourceListBulkAction[];
  bulkDelete?: boolean;
  bulkActionsEnabled?: boolean;
  queryState: ReturnType<typeof useListQueryState>[0];
  queryActions: ReturnType<typeof useListQueryState>[1];
}) {
  const dp = useDataProvider();
  const can = usePermissions();
  const { message, modal } = App.useApp();
  const { columns, sortOrders, sortPriorities } = useListContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
    () => new Set(),
  );
  const [bulkRunning, setBulkRunning] = useState(false);

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

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const availableBulkActions = useMemo((): ResourceListBulkAction[] => {
    if (!bulkActionsEnabled) return [];
    const built: ResourceListBulkAction[] = [];
    if (bulkDelete && del) {
      built.push({
        key: "__delete",
        label: "Delete selected",
        confirm: (ids) =>
          `Delete ${ids.length} selected item(s)? This cannot be undone.`,
        execute: async (ids, { reload, clearSelection: clear }) => {
          await Promise.all(
            ids.map((id) => dp.delete(resource, id as string | number)),
          );
          clear();
          reload();
          message.success(`Deleted ${ids.length} item(s)`);
        },
      });
    }
    return [...built, ...(bulkActionsProp ?? [])];
  }, [
    bulkActionsEnabled,
    bulkDelete,
    del,
    bulkActionsProp,
    dp,
    resource,
    message,
  ]);

  const showBulkActions = availableBulkActions.length > 0;

  const selectedCount = selectedIds.size;
  const allPageSelected =
    data.length > 0 &&
    data.every((row) => selectedIds.has(row.id as string | number));
  const allMatchingSelected = total > 0 && selectedCount >= total;

  const selectedRowKeys = useMemo((): Key[] => {
    return data
      .filter((row) => selectedIds.has(row.id as string | number))
      .map((row) => row.id as Key);
  }, [data, selectedIds]);

  const handleRowSelectionChange = useCallback(
    (keys: Key[]) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        const pageIds = data.map((row) => row.id as string | number);
        for (const id of pageIds) {
          if (!keys.includes(id)) next.delete(id);
        }
        for (const key of keys) {
          next.add(key as string | number);
        }
        return next;
      });
    },
    [data],
  );

  const handleSelectAllMatching = useCallback(async () => {
    if (total <= 0) return;
    setBulkRunning(true);
    try {
      const sort =
        queryState.sort.length === 0
          ? undefined
          : queryState.sort.length === 1
            ? queryState.sort[0]
            : queryState.sort;
      const res = await dp.getList(resource, {
        pagination: { page: 1, perPage: total },
        sort,
        filter: queryState.filter,
      });
      setSelectedIds(
        new Set(res.data.map((row) => row.id as string | number)),
      );
    } catch (e) {
      message.error(e instanceof Error ? e.message : "Load failed");
    } finally {
      setBulkRunning(false);
    }
  }, [dp, resource, total, queryState.sort, queryState.filter, message]);

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

  const bulkActionHelpers = useMemo(
    (): ResourceListBulkActionHelpers => ({
      reload: () => void load(),
      clearSelection,
    }),
    [load, clearSelection],
  );

  const handleBulkExecute = useCallback(
    async (action: ResourceListBulkAction, ids: (string | number)[]) => {
      if (action.confirm) {
        const confirmMsg =
          typeof action.confirm === "function"
            ? await action.confirm(ids, bulkActionHelpers)
            : action.confirm;
        if (confirmMsg === false) return;
        const confirmed = await new Promise<boolean>((resolve) => {
          modal.confirm({
            title: confirmMsg,
            okType: action.key === "__delete" ? "danger" : "primary",
            onOk: () => resolve(true),
            onCancel: () => resolve(false),
          });
        });
        if (!confirmed) return;
      }

      setBulkRunning(true);
      try {
        await action.execute(ids, bulkActionHelpers);
      } catch (e) {
        message.error(e instanceof Error ? e.message : "Action failed");
      } finally {
        setBulkRunning(false);
      }
    },
    [bulkActionHelpers, modal, message],
  );

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
        {showBulkActions ? (
          <ListActionsBar
            selectedCount={selectedCount}
            total={total}
            allPageSelected={allPageSelected}
            allMatchingSelected={allMatchingSelected}
            onSelectAllMatching={() => void handleSelectAllMatching()}
            onClearSelection={clearSelection}
            actions={availableBulkActions}
            onExecute={handleBulkExecute}
            selectedIds={[...selectedIds]}
            running={bulkRunning || loading}
          />
        ) : null}
        <Table<T>
          rowKey="id"
          loading={loading}
          columns={tableColumns}
          dataSource={data}
          rowSelection={
            showBulkActions
              ? {
                  selectedRowKeys,
                  onChange: handleRowSelectionChange,
                  preserveSelectedRowKeys: true,
                }
              : undefined
          }
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
  bulkActions,
  bulkDelete,
  bulkActionsEnabled,
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
            bulkActions={bulkActions}
            bulkDelete={bulkDelete}
            bulkActionsEnabled={bulkActionsEnabled}
            queryState={queryState}
            queryActions={queryActions}
          />
        </ListContextProvider>
      </FilterContextProvider>
    </ResourceListContext.Provider>
  );
}
