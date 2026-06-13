import { createContext, useContext, type MutableRefObject, type ReactNode } from "react";

const FormSectionSourcesContext =
  createContext<MutableRefObject<Set<string>> | null>(null);

export function FormSectionSourcesProvider({
  sourcesRef,
  children,
}: {
  sourcesRef: MutableRefObject<Set<string>>;
  children: ReactNode;
}) {
  return (
    <FormSectionSourcesContext.Provider value={sourcesRef}>
      {children}
    </FormSectionSourcesContext.Provider>
  );
}

export function useFormSectionSourcesOptional() {
  return useContext(FormSectionSourcesContext);
}
