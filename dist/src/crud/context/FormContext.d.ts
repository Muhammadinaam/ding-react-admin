import { ReactNode } from 'react';
type FormMetaContextValue = {
    resource: string;
    isNew: boolean;
    disabled?: boolean;
};
export declare function FormMetaProvider({ children, resource, isNew, disabled, }: {
    children: ReactNode;
    resource: string;
    isNew: boolean;
    disabled?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export declare function useFormMeta(): FormMetaContextValue;
export declare function useFormMetaOptional(): FormMetaContextValue | null;
export {};
//# sourceMappingURL=FormContext.d.ts.map