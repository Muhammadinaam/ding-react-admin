import { ReactNode } from 'react';
import { InlineFieldDefinition } from '../types';
export type InlineFormSetLayout = "tabular" | "stacked";
export declare function InlineFormSetProvider({ children, arrayName, layout, }: {
    children: ReactNode;
    arrayName: string;
    layout?: InlineFormSetLayout;
}): import("react/jsx-runtime").JSX.Element;
export declare function useInlineFormSetContext(): {
    fields: InlineFieldDefinition[];
    registerField: (def: InlineFieldDefinition) => () => void;
    arrayName: string;
    layout: InlineFormSetLayout;
} | null;
export declare function useRegisterInlineField(def: InlineFieldDefinition): void;
//# sourceMappingURL=InlineFormContext.d.ts.map