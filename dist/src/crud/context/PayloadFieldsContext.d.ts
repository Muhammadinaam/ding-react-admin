import { MutableRefObject, ReactNode } from 'react';
/** Tracks which field paths are included in the save payload. */
export declare function PayloadFieldsProvider({ children, fieldsRef, }: {
    children: ReactNode;
    fieldsRef: MutableRefObject<Set<string>>;
}): import("react/jsx-runtime").JSX.Element;
export declare function usePayloadFieldsRefOptional(): MutableRefObject<Set<string>> | null;
/**
 * Register a field path for the save payload (`buildFormPayload`).
 * Top-level fields use `source`; inline arrays register their `field` name.
 */
export declare function useRegisterPayloadField(fieldPath: string, enabled?: boolean): void;
/**
 * Register a field for tab/step error highlighting.
 * Top-level fields only — no-op outside FormTabs / FormSteps.
 */
export declare function useRegisterSectionField(source: string, enabled?: boolean): void;
//# sourceMappingURL=PayloadFieldsContext.d.ts.map