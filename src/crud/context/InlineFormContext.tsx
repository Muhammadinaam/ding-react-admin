import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { InlineFieldDefinition } from "../types";

export type InlineFormSetLayout = "tabular" | "stacked";

type InlineFormSetMeta = {
  registerField: (def: InlineFieldDefinition) => () => void;
  arrayName: string;
  layout: InlineFormSetLayout;
};

const InlineFormSetMetaContext = createContext<InlineFormSetMeta | null>(null);
const InlineFormSetFieldsContext = createContext<InlineFieldDefinition[]>([]);

export function InlineFormSetProvider({
  children,
  arrayName,
  layout = "tabular",
}: {
  children: ReactNode;
  arrayName: string;
  layout?: InlineFormSetLayout;
}) {
  const [fields, setFields] = useState<InlineFieldDefinition[]>([]);

  const registerField = useCallback((def: InlineFieldDefinition) => {
    setFields((prev) => {
      if (prev.some((f) => f.key === def.key)) return prev;
      return [...prev, def];
    });
    return () => {
      setFields((prev) => prev.filter((f) => f.key !== def.key));
    };
  }, []);

  const meta = useMemo(
    (): InlineFormSetMeta => ({ arrayName, registerField, layout }),
    [arrayName, registerField, layout],
  );

  return (
    <InlineFormSetMetaContext.Provider value={meta}>
      <InlineFormSetFieldsContext.Provider value={fields}>
        {children}
      </InlineFormSetFieldsContext.Provider>
    </InlineFormSetMetaContext.Provider>
  );
}

export function useInlineFormSetContext() {
  const meta = useContext(InlineFormSetMetaContext);
  const fields = useContext(InlineFormSetFieldsContext);
  if (!meta) return null;
  return { ...meta, fields };
}

export function useRegisterInlineField(def: InlineFieldDefinition) {
  const registerField = useContext(InlineFormSetMetaContext)?.registerField;
  useEffect(() => {
    if (!registerField) return;
    return registerField(def);
  }, [registerField, def]);
}
