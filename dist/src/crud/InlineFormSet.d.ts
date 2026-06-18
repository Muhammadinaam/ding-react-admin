import { ReactNode } from 'react';
import { Identifier, DataProvider } from '../data/dataProviderTypes';
import { InlineColumnDef, InlineFormSetBaseProps, InlineRowContext } from './types';
export type InlineFormSetLayout = "tabular" | "stacked";
export type InlineFormSetProps = InlineFormSetBaseProps & {
    columns: InlineColumnDef[];
};
export type InlineFormSetStackedProps = InlineFormSetBaseProps & {
    /** Field sources in each row — used when appending an empty row. */
    sources: string[];
    renderRow: (ctx: InlineRowContext) => ReactNode;
};
/** Tabular inline (Django TabularInline) — table with column headers. */
export declare function InlineFormSet({ resource, label, name, columns, }: InlineFormSetProps): import("react/jsx-runtime").JSX.Element;
/** Stacked inline (Django StackedInline) — each row in a card with field labels. */
export declare function InlineFormSetStacked({ resource, label, name, sources, renderRow, }: InlineFormSetStackedProps): import("react/jsx-runtime").JSX.Element;
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