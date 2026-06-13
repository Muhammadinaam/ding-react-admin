import { MutableRefObject, ReactNode } from 'react';
export declare function FormSectionSourcesProvider({ sourcesRef, children, }: {
    sourcesRef: MutableRefObject<Set<string>>;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useFormSectionSourcesOptional(): MutableRefObject<Set<string>> | null;
//# sourceMappingURL=FormSectionContext.d.ts.map