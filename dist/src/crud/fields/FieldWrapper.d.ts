import { ReactNode } from 'react';
import { FieldRules } from '../types';
export type FieldWrapperProps = {
    source: string;
    label?: string;
    required?: boolean;
    rules?: FieldRules;
    children: (props: {
        value: unknown;
        onChange: (value: unknown) => void;
        onBlur: () => void;
        disabled?: boolean;
    }) => ReactNode;
};
export declare function FieldWrapper({ source, label, required, rules, children, }: FieldWrapperProps): import("react/jsx-runtime").JSX.Element;
export declare function InlineFieldWrapper({ name, label, required, rules, hideLabel, children, }: {
    name: string;
    label?: string;
    required?: boolean;
    rules?: FieldRules;
    /** Tabular inlines use column headers — suppress per-cell labels. */
    hideLabel?: boolean;
    children: (props: {
        value: unknown;
        onChange: (value: unknown) => void;
        onBlur: () => void;
    }) => ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FieldWrapper.d.ts.map