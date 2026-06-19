import { RefObject, ReactNode } from 'react';
export type InlineFieldRegistration = {
    field: string;
    sources: string[];
    payloadKey?: string;
    transformRows?: (rows: Record<string, unknown>[]) => unknown;
};
export declare function InlineFieldsRegistryProvider({ children, registryRef, }: {
    children: ReactNode;
    registryRef: RefObject<Map<string, InlineFieldRegistration>>;
}): import("react/jsx-runtime").JSX.Element;
export declare function useInlineFieldsRegistryOptional(): RefObject<Map<string, InlineFieldRegistration>> | null;
/** Register an inline field array (`useFieldArray` name) for save payload cleaning. */
export declare function useRegisterInlineField(field: string, sources: string[], payloadKey?: string, transformRows?: (rows: Record<string, unknown>[]) => unknown, enabled?: boolean): void;
//# sourceMappingURL=InlineFieldsRegistry.d.ts.map