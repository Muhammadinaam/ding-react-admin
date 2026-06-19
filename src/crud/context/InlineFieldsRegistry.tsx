import {
  createContext,
  useContext,
  useEffect,
  type RefObject,
  type ReactNode,
} from "react";

export type InlineFieldRegistration = {
  field: string;
  sources: string[];
  payloadKey?: string;
  transformRows?: (rows: Record<string, unknown>[]) => unknown;
};

const InlineFieldsRegistryContext =
  createContext<RefObject<Map<string, InlineFieldRegistration>> | null>(
    null,
  );

export function InlineFieldsRegistryProvider({
  children,
  registryRef,
}: {
  children: ReactNode;
  registryRef: RefObject<Map<string, InlineFieldRegistration>>;
}) {
  return (
    <InlineFieldsRegistryContext.Provider value={registryRef}>
      {children}
    </InlineFieldsRegistryContext.Provider>
  );
}

export function useInlineFieldsRegistryOptional() {
  return useContext(InlineFieldsRegistryContext);
}

/** Register an inline field array (`useFieldArray` name) for save payload cleaning. */
export function useRegisterInlineField(
  field: string,
  sources: string[],
  payloadKey?: string,
  transformRows?: (rows: Record<string, unknown>[]) => unknown,
  enabled = true,
) {
  const registryRef = useInlineFieldsRegistryOptional();

  useEffect(() => {
    if (!enabled || !registryRef) return;
    registryRef.current.set(field, {
      field,
      sources,
      payloadKey,
      transformRows,
    });
    return () => {
      registryRef.current.delete(field);
    };
  }, [registryRef, field, sources, payloadKey, transformRows, enabled]);
}
