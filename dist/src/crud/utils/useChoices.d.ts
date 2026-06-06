import { ChoiceOption, ChoicesLoader } from '../types';
export declare function useChoices(loader: ChoicesLoader | undefined, reference: string | undefined, optionLabel?: string | ((record: Record<string, unknown>) => string), optionValue?: string, search?: string): {
    options: ChoiceOption[];
    loading: boolean;
    labelForValue: (value: unknown) => string;
    labelsForValues: (values: unknown[]) => string;
    optionForValue: (value: unknown) => ChoiceOption | undefined;
    reload: () => Promise<void>;
};
//# sourceMappingURL=useChoices.d.ts.map