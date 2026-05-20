import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ColumnDefinition } from "../types";
import { sortPrioritiesFromSpecs } from "../utils/sortQueryParam";

type ListContextValue = {
  registerColumn: (def: ColumnDefinition<Record<string, unknown>>) => () => void;
  columns: ColumnDefinition<Record<string, unknown>>[];
  toggleSort: (field: string) => void;
  sortFields: Set<string>;
  sortOrders: Map<string, "ASC" | "DESC">;
  sortPriorities: Map<string, number>;
};

const ListContext = createContext<ListContextValue | null>(null);

export function ListContextProvider({
  children,
  toggleSort,
  sort,
}: {
  children: ReactNode;
  toggleSort: (field: string) => void;
  sort: { field: string; order: "ASC" | "DESC" }[];
}) {
  const [columns, setColumns] = useState<
    ColumnDefinition<Record<string, unknown>>[]
  >([]);

  const sortFields = useMemo(() => new Set(sort.map((s) => s.field)), [sort]);
  const sortOrders = useMemo(
    () => new Map(sort.map((s) => [s.field, s.order])),
    [sort],
  );
  const sortPriorities = useMemo(() => sortPrioritiesFromSpecs(sort), [sort]);

  const registerColumn = useCallback(
    (def: ColumnDefinition<Record<string, unknown>>) => {
      setColumns((prev) => {
        const idx = prev.findIndex((c) => c.key === def.key);
        if (idx < 0) return [...prev, def];
        if (prev[idx] === def) return prev;
        const next = [...prev];
        next[idx] = def;
        return next;
      });
      return () => {
        setColumns((prev) => prev.filter((c) => c.key !== def.key));
      };
    },
    [],
  );

  const value = useMemo(
    (): ListContextValue => ({
      columns,
      toggleSort,
      sortFields,
      sortOrders,
      sortPriorities,
      registerColumn,
    }),
    [columns, toggleSort, sortFields, sortOrders, sortPriorities, registerColumn],
  );

  return (
    <ListContext.Provider value={value}>{children}</ListContext.Provider>
  );
}

export function useListContext() {
  const ctx = useContext(ListContext);
  if (!ctx) {
    throw new Error("Column components must be used within ResourceList");
  }
  return ctx;
}

export function useRegisterColumn(
  def: ColumnDefinition<Record<string, unknown>>,
) {
  const { registerColumn } = useListContext();
  useEffect(() => {
    return registerColumn(def);
  }, [registerColumn, def]);
}
