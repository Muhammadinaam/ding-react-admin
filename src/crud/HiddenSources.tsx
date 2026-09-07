import { createContext, useContext, useMemo, type ReactNode } from "react";

const EMPTY = new Set<string>();

const HiddenSourcesContext = createContext<Set<string>>(EMPTY);

export function isSourceHidden(
  source: string,
  hidden: boolean | undefined,
  hiddenSources: Set<string>,
): boolean {
  return Boolean(hidden) || hiddenSources.has(source);
}

export function useHiddenSources(): Set<string> {
  return useContext(HiddenSourcesContext);
}

/** Recursively hide descendant fields whose `source` is in `sources` (via context). */
export function HiddenSources({
  sources,
  children,
}: {
  sources: Iterable<string>;
  children: ReactNode;
}) {
  const value = useMemo(
    () => (sources instanceof Set ? sources : new Set(sources)),
    [sources],
  );
  if (value.size === 0) return children;
  return (
    <HiddenSourcesContext.Provider value={value}>
      {children}
    </HiddenSourcesContext.Provider>
  );
}
