import { BaseSourceProps, FieldRules } from '../types';
export type BooleanFieldProps = BaseSourceProps & {
    required?: boolean;
    rules?: FieldRules;
};
export declare function BooleanField({ source, label, required, rules, }: BooleanFieldProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=BooleanField.d.ts.map