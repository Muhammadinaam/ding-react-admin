import { BaseSourceProps } from '../types';
export type TextColumnProps = BaseSourceProps & {
    sortable?: boolean;
};
export declare function TextColumn({ source, label, sortable }: TextColumnProps): null;
export declare function renderDisplayValue(record: Record<string, unknown>, source: string, display?: string | ((record: Record<string, unknown>) => unknown)): unknown;
//# sourceMappingURL=TextColumn.d.ts.map