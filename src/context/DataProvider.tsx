import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { DataProvider as DataProviderContract } from "../data/dataProviderTypes";

const DataContext = createContext<DataProviderContract | null>(null);

export type DataProviderProps = {
  children: ReactNode;
  /** Your API client (REST adapter, in-memory mock, etc.). */
  value: DataProviderContract;
};

export function DataProvider({ children, value }: DataProviderProps) {
  const memo = useMemo(() => value, [value]);
  return (
    <DataContext.Provider value={memo}>{children}</DataContext.Provider>
  );
}

export function useDataProvider() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useDataProvider must be used within DataProvider");
  }
  return ctx;
}
