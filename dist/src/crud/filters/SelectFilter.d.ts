import { BaseSourceProps, ChoiceOption } from '../types';
export type SelectFilterProps = BaseSourceProps & {
    choices: ChoiceOption[];
    multiple?: boolean;
};
export declare function SelectFilter({ source, label, choices, multiple, }: SelectFilterProps): null;
//# sourceMappingURL=SelectFilter.d.ts.map