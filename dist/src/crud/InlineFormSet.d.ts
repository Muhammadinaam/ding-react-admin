import { ReactNode } from 'react';
import { InlineColumnDef, InlineFormSetBaseProps, InlineRowContext } from './types';
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
/** Tabular inline (Django TabularInline) — table with column headers. */
export declare function InlineFormSet({ field, label, payloadKey, transformRows, columns, defaultRow, }: InlineFormSetProps): import("react/jsx-runtime").JSX.Element;
/** Stacked inline (Django StackedInline) — each row in a card with field labels. */
export declare function InlineFormSetStacked({ field, label, payloadKey, transformRows, sources, renderRow, getCardTitle, footer, defaultRow, }: InlineFormSetStackedProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=InlineFormSet.d.ts.map