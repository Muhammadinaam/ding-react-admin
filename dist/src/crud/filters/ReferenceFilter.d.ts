import { BaseSourceProps, ChoiceOption, ReferenceProps } from '../types';
export type SelectFilterProps = BaseSourceProps & {
    choices: ChoiceOption[];
    multiple?: boolean;
};
export declare function SelectFilter({ source, label, choices, multiple, }: SelectFilterProps): null;
export type ReferenceFilterProps = BaseSourceProps & ReferenceProps & {
    multiple?: boolean;
    search?: boolean;
};
export declare function ReferenceFilter({ source, label, reference, choices, optionLabel, optionValue, multiple, search, }: ReferenceFilterProps): null;
export declare function ReferenceManyFilter(props: ReferenceFilterProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReferenceFilter.d.ts.map