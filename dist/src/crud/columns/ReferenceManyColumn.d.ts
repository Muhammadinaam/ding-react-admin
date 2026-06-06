import { BaseSourceProps, DisplayProps, ReferenceProps } from '../types';
export type ReferenceManyColumnProps = BaseSourceProps & ReferenceProps & DisplayProps & {
    sortable?: boolean;
};
export declare function ReferenceManyColumn({ source, label, reference, choices, optionLabel, optionValue, sortable, }: ReferenceManyColumnProps): null;
//# sourceMappingURL=ReferenceManyColumn.d.ts.map