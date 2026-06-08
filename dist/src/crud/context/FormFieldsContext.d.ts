import { MutableRefObject, ReactNode } from 'react';
type FormFieldsContextValue = {
    registerSource: (source: string) => () => void;
    getSources: () => string[];
};
export declare function FormFieldsProvider({ children, sourcesRef: externalSourcesRef, }: {
    children: ReactNode;
    /** Optional ref shared with submit handler outside this provider. */
    sourcesRef?: MutableRefObject<Set<string>>;
}): import("react/jsx-runtime").JSX.Element;
export declare function useFormFieldsOptional(): FormFieldsContextValue | null;
export declare function useRegisterFormSource(source: string): void;
export {};
//# sourceMappingURL=FormFieldsContext.d.ts.map