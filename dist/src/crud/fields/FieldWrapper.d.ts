import { ReactNode } from 'react';
import { FieldRules } from '../types';
export type FieldWrapperProps = {
    /** Logical field name — used for submit payload tracking on top-level fields. */
    source: string;
    /** Full RHF path. Defaults to `source`. Inline cells pass e.g. `lines.0.label`. */
    name?: string;
    label?: string;
    required?: boolean;
    rules?: FieldRules;
    /** Tabular inline cells: column header replaces the label. */
    hideLabel?: boolean;
    children: (props: {
        value: unknown;
        onChange: (value: unknown) => void;
        onBlur: () => void;
        disabled?: boolean;
        name: string;
    }) => ReactNode;
};
export declare function FieldWrapper({ source, name, label, required, rules, hideLabel, children, }: FieldWrapperProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FieldWrapper.d.ts.map