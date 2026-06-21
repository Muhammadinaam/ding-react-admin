import { createContext, useContext, type ReactNode } from "react";

type FormMetaContextValue = {
  resource: string;
  isNew: boolean;
  disabled?: boolean;
};

const FormMetaContext = createContext<FormMetaContextValue | null>(null);

export function FormMetaProvider({
  children,
  resource,
  isNew,
  disabled,
}: {
  children: ReactNode;
  resource: string;
  isNew: boolean;
  disabled?: boolean;
}) {
  return (
    <FormMetaContext.Provider value={{ resource, isNew, disabled }}>
      {children}
    </FormMetaContext.Provider>
  );
}

export function useFormMeta() {
  const ctx = useContext(FormMetaContext);
  if (!ctx) {
    throw new Error("Field components must be used within a resource form");
  }
  return ctx;
}

export function useFormMetaOptional() {
  return useContext(FormMetaContext);
}
