import { Button, Select, Space, Typography } from "antd";
import { useCallback, useMemo, useState } from "react";
import type { ResourceListBulkAction } from "./types";

export type ListActionsBarProps = {
  selectedCount: number;
  total: number;
  allPageSelected: boolean;
  allMatchingSelected: boolean;
  onSelectAllMatching: () => void;
  onClearSelection: () => void;
  actions: ResourceListBulkAction[];
  onExecute: (
    action: ResourceListBulkAction,
    selectedIds: (string | number)[],
  ) => Promise<void>;
  selectedIds: (string | number)[];
  running?: boolean;
};

export function ListActionsBar({
  selectedCount,
  total,
  allPageSelected,
  allMatchingSelected,
  onSelectAllMatching,
  onClearSelection,
  actions,
  onExecute,
  selectedIds,
  running = false,
}: ListActionsBarProps) {
  const [actionKey, setActionKey] = useState<string | undefined>();

  const options = useMemo(
    () => actions.map((a) => ({ value: a.key, label: a.label })),
    [actions],
  );

  const handleGo = useCallback(async () => {
    const action = actions.find((a) => a.key === actionKey);
    if (!action || selectedCount === 0) return;
    await onExecute(action, selectedIds);
    setActionKey(undefined);
  }, [actions, actionKey, onExecute, selectedCount, selectedIds]);

  const showSelectAllMatching =
    allPageSelected &&
    !allMatchingSelected &&
    total > selectedCount;

  return (
    <Space
      wrap
      style={{ marginBottom: 16, width: "100%" }}
      align="center"
    >
      <Typography.Text type="secondary">
        {selectedCount} of {total} selected
      </Typography.Text>
      {selectedCount > 0 ? (
        <Button type="link" size="small" onClick={onClearSelection} style={{ padding: 0 }}>
          Clear selection
        </Button>
      ) : null}
      {showSelectAllMatching ? (
        <>
          <Typography.Text type="secondary">·</Typography.Text>
          <Button
            type="link"
            size="small"
            onClick={onSelectAllMatching}
            style={{ padding: 0 }}
          >
            Select all {total} items matching filter
          </Button>
        </>
      ) : null}
      {allMatchingSelected && total > 0 ? (
        <>
          <Typography.Text type="secondary">·</Typography.Text>
          <Typography.Text type="success">
            All {total} items selected
          </Typography.Text>
        </>
      ) : null}
      <Select
        placeholder="Action"
        style={{ minWidth: 200 }}
        options={options}
        value={actionKey}
        onChange={setActionKey}
        disabled={selectedCount === 0 || running}
        allowClear
      />
      <Button
        type="primary"
        onClick={() => void handleGo()}
        disabled={!actionKey || selectedCount === 0 || running}
        loading={running}
      >
        Go
      </Button>
    </Space>
  );
}
