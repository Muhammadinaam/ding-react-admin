import { BaseSourceProps, DisplayProps, ReferenceProps } from '../types';
export type ReferenceColumnProps = BaseSourceProps & ReferenceProps & DisplayProps & {
    sortable?: boolean;
};
export declare function ReferenceColumn({ source, label, reference, choices, optionLabel, optionValue, display, sortable, }: ReferenceColumnProps): null;
//# sourceMappingURL=ReferenceColumn.d.ts.map