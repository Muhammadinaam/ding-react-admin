import { ReactNode } from 'react';
export type CustomColumnProps = {
    source: string;
    label?: string;
    sortable?: boolean;
    render: (record: Record<string, unknown>) => ReactNode;
};
export declare function CustomColumn({ source, label, sortable, render, }: CustomColumnProps): null;
//# sourceMappingURL=CustomColumn.d.ts.map