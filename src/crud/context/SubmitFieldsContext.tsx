import {
  createContext,
  useContext,
  useEffect,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { useFormSectionSourcesOptional } from "./FormSectionContext";

const SubmitFieldsContext =
  createContext<MutableRefObject<Set<string>> | null>(null);

/** Tracks which top-level field sources are included in the save payload. */
export function SubmitFieldsProvider({
  children,
  fieldsRef,
}: {
  children: ReactNode;
  fieldsRef: MutableRefObject<Set<string>>;
}) {
  return (
    <SubmitFieldsContext.Provider value={fieldsRef}>
      {children}
    </SubmitFieldsContext.Provider>
  );
}

export function useSubmitFieldsOptional() {
  return useContext(SubmitFieldsContext);
}

/**
 * Remember a field's `source` for submit (`pickBySources`).
 * Top-level fields only — skip for inline row cells (nested `name` paths).
 */
export function useSubmitField(source: string, enabled = true) {
  const fieldsRef = useSubmitFieldsOptional();

  useEffect(() => {
    if (!enabled || !fieldsRef) return;
    fieldsRef.current.add(source);
    return () => {
      fieldsRef.current.delete(source);
    };
  }, [fieldsRef, source, enabled]);
}

/**
 * Remember a field's `source` for tab/step error highlighting.
 * Top-level fields only — no-op outside FormTabs / FormSteps.
 */
export function useSectionField(source: string, enabled = true) {
  const sectionRef = useFormSectionSourcesOptional();

  useEffect(() => {
    if (!enabled || !sectionRef) return;
    sectionRef.current.add(source);
    return () => {
      sectionRef.current.delete(source);
    };
  }, [sectionRef, source, enabled]);
}
