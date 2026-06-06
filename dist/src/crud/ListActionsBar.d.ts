import { ResourceListBulkAction } from './types';
export type ListActionsBarProps = {
    selectedCount: number;
    total: number;
    allPageSelected: boolean;
    allMatchingSelected: boolean;
    onSelectAllMatching: () => void;
    onClearSelection: () => void;
    actions: ResourceListBulkAction[];
    onExecute: (action: ResourceListBulkAction, selectedIds: (string | number)[]) => Promise<void>;
    selectedIds: (string | number)[];
    running?: boolean;
};
export declare function ListActionsBar({ selectedCount, total, allPageSelected, allMatchingSelected, onSelectAllMatching, onClearSelection, actions, onExecute, selectedIds, running, }: ListActionsBarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ListActionsBar.d.ts.map