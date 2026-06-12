import { ReactNode } from 'react';
import { InlineFormSetLayout } from './context/InlineFormContext';
import { Identifier, DataProvider } from '../data/dataProviderTypes';
export type { InlineFormSetLayout } from './context/InlineFormContext';
export type InlineFormSetProps = {
    resource: string;
    foreignKey: string;
    label?: string;
    children: ReactNode;
    name?: string;
    /** `tabular` (default) — Django TabularInline; `stacked` — Django StackedInline. */
    layout?: InlineFormSetLayout;
};
export declare function InlineFormSet({ resource, label, children, name, layout, }: InlineFormSetProps): import("react/jsx-runtime").JSX.Element;
export type SaveInlineOptions = {
    resource: string;
    foreignKey: string;
    parentId: Identifier;
    rows: Record<string, unknown>[];
    existingIds?: Identifier[];
    /** Return true when the error was handled (field errors applied). Stops saving further rows. */
    onRowError?: (error: unknown, index: number) => boolean;
};
export declare function saveInlineRows(dp: DataProvider, opts: SaveInlineOptions): Promise<boolean>;
export declare function loadInlineRows(dp: DataProvider, resource: string, foreignKey: string, parentId: Identifier): Promise<{
    rows: Record<string, unknown>[];
    ids: Identifier[];
}>;
//# sourceMappingURL=InlineFormSet.d.ts.map