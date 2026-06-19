import {
  createContext,
  useContext,
  useEffect,
  type RefObject,
  type ReactNode,
} from "react";
import { useFormSectionSourcesOptional } from "./FormSectionContext";

const PayloadFieldsContext =
  createContext<RefObject<Set<string>> | null>(null);

/** Tracks which field paths are included in the save payload. */
export function PayloadFieldsProvider({
  children,
  fieldsRef,
}: {
  children: ReactNode;
  fieldsRef: RefObject<Set<string>>;
}) {
  return (
    <PayloadFieldsContext.Provider value={fieldsRef}>
      {children}
    </PayloadFieldsContext.Provider>
  );
}

export function usePayloadFieldsRefOptional() {
  return useContext(PayloadFieldsContext);
}

/**
 * Register a field path for the save payload (`buildFormPayload`).
 * Top-level fields use `source`; inline arrays register their `field` name.
 */
export function useRegisterPayloadField(fieldPath: string, enabled = true) {
  const fieldsRef = usePayloadFieldsRefOptional();

  useEffect(() => {
    if (!enabled || !fieldsRef) return;
    fieldsRef.current.add(fieldPath);
    return () => {
      fieldsRef.current.delete(fieldPath);
    };
  }, [fieldsRef, fieldPath, enabled]);
}

/**
 * Register a field for tab/step error highlighting.
 * Top-level fields only — no-op outside FormTabs / FormSteps.
 */
export function useRegisterSectionField(source: string, enabled = true) {
  const sectionRef = useFormSectionSourcesOptional();

  useEffect(() => {
    if (!enabled || !sectionRef) return;
    sectionRef.current.add(source);
    return () => {
      sectionRef.current.delete(source);
    };
  }, [sectionRef, source, enabled]);
}
