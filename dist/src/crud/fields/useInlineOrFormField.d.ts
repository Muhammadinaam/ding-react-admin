import { ReactNode } from 'react';
import { FieldRenderProps, FieldRules, InlineFieldOptions } from '../types';
export declare function useInlineOrFormField(source: string, label: string | undefined, required: boolean | undefined, rules: FieldRules | undefined, renderInput: (props: FieldRenderProps) => ReactNode, inlineOptions?: InlineFieldOptions): {
    mode: "inline";
    element?: undefined;
} | {
    mode: "form";
    element: import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=useInlineOrFormField.d.ts.map