import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { FilterDefinition } from "../types";

type FilterContextValue = {
  registerFilter: (def: FilterDefinition) => () => void;
  filters: FilterDefinition[];
  values: Record<string, unknown>;
  setFilterValue: (source: string, value: unknown) => void;
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterContextProvider({
  children,
  values,
  setFilterValue,
}: {
  children: ReactNode;
  values: Record<string, unknown>;
  setFilterValue: (source: string, value: unknown) => void;
}) {
  const [filters, setFilters] = useState<FilterDefinition[]>([]);

  const registerFilter = useCallback((def: FilterDefinition) => {
    setFilters((prev) => {
      const idx = prev.findIndex((f) => f.key === def.key);
      if (idx < 0) return [...prev, def];
      if (prev[idx] === def) return prev;
      const next = [...prev];
      next[idx] = def;
      return next;
    });
    return () => {
      setFilters((prev) => prev.filter((f) => f.key !== def.key));
    };
  }, []);

  const value = useMemo(
    (): FilterContextValue => ({
      filters,
      values,
      setFilterValue,
      registerFilter,
    }),
    [filters, values, setFilterValue, registerFilter],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilterContext() {
  return useContext(FilterContext);
}

export function useRegisterFilter(def: FilterDefinition) {
  const registerFilter = useFilterContext()?.registerFilter;
  useEffect(() => {
    if (!registerFilter) return;
    return registerFilter(def);
  }, [registerFilter, def]);
}
