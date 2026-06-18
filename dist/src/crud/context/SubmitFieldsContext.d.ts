import { MutableRefObject, ReactNode } from 'react';
/** Tracks which top-level field sources are included in the save payload. */
export declare function SubmitFieldsProvider({ children, fieldsRef, }: {
    children: ReactNode;
    fieldsRef: MutableRefObject<Set<string>>;
}): import("react/jsx-runtime").JSX.Element;
export declare function useSubmitFieldsOptional(): MutableRefObject<Set<string>> | null;
/**
 * Remember a field's `source` for submit (`pickBySources`).
 * Top-level fields only — skip for inline row cells (nested `name` paths).
 */
export declare function useSubmitField(source: string, enabled?: boolean): void;
/**
 * Remember a field's `source` for tab/step error highlighting.
 * Top-level fields only — no-op outside FormTabs / FormSteps.
 */
export declare function useSectionField(source: string, enabled?: boolean): void;
//# sourceMappingURL=SubmitFieldsContext.d.ts.map