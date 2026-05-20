import { useCallback, useEffect, useMemo, useState } from "react";
import { useDataProvider } from "../../context/DataProvider";
import type { ChoiceOption, ChoicesLoader } from "../types";

const choicesCache = new Map<string, ChoiceOption[]>();
const choicesInflight = new Map<string, Promise<ChoiceOption[]>>();

function loaderKey(loader: ChoicesLoader, search?: string): string {
  if (typeof loader === "function") return `fn:${search ?? ""}`;
  if (Array.isArray(loader)) return `static:${loader.length}`;
  return `res:${loader.resource}:${JSON.stringify(loader.filter ?? {})}:${search ?? ""}`;
}

function resolveOptionLabel(
  record: Record<string, unknown>,
  optionLabel: string | ((record: Record<string, unknown>) => string),
): string {
  if (typeof optionLabel === "function") return optionLabel(record);
  return String(record[optionLabel] ?? "");
}

async function fetchChoices(
  effectiveLoader: ChoicesLoader,
  dp: ReturnType<typeof useDataProvider>,
  optionLabel: string | ((record: Record<string, unknown>) => string),
  optionValue: string,
  search?: string,
): Promise<ChoiceOption[]> {
  if (typeof effectiveLoader === "function") {
    return effectiveLoader({ dataProvider: dp, search });
  }
  if (Array.isArray(effectiveLoader)) {
    return effectiveLoader;
  }
  const res = await dp.getList(effectiveLoader.resource, {
    filter: {
      ...effectiveLoader.filter,
      ...(search ? { q: search } : {}),
    },
    pagination: { page: 1, perPage: 500 },
  });
  return (res.data as Record<string, unknown>[]).map((row) => ({
    label: resolveOptionLabel(row, optionLabel),
    value: row[optionValue],
    record: row,
  }));
}

function loadChoicesShared(
  effectiveLoader: ChoicesLoader,
  dp: ReturnType<typeof useDataProvider>,
  optionLabel: string | ((record: Record<string, unknown>) => string),
  optionValue: string,
  search?: string,
): Promise<ChoiceOption[]> {
  const key = loaderKey(effectiveLoader, search);
  const cached = choicesCache.get(key);
  if (cached && !search) {
    return Promise.resolve(cached);
  }

  const inflight = choicesInflight.get(key);
  if (inflight) return inflight;

  const promise = fetchChoices(
    effectiveLoader,
    dp,
    optionLabel,
    optionValue,
    search,
  )
    .then((result) => {
      if (!search) choicesCache.set(key, result);
      return result;
    })
    .finally(() => {
      choicesInflight.delete(key);
    });

  choicesInflight.set(key, promise);
  return promise;
}

export function useChoices(
  loader: ChoicesLoader | undefined,
  reference: string | undefined,
  optionLabel: string | ((record: Record<string, unknown>) => string) = "name",
  optionValue = "id",
  search?: string,
) {
  const dp = useDataProvider();

  const effectiveLoader = useMemo((): ChoicesLoader | undefined => {
    if (loader) return loader;
    if (!reference) return undefined;
    return {
      resource: reference,
      filter: search ? { q: search } : undefined,
    };
  }, [loader, reference, search]);

  const cacheKey = effectiveLoader
    ? loaderKey(effectiveLoader, search)
    : undefined;

  const [options, setOptions] = useState<ChoiceOption[]>(() => {
    if (!cacheKey || search) return [];
    return choicesCache.get(cacheKey) ?? [];
  });

  const [loading, setLoading] = useState(() => {
    if (!cacheKey || search) return Boolean(effectiveLoader);
    return !choicesCache.has(cacheKey);
  });

  const load = useCallback(async () => {
    if (!effectiveLoader) {
      setOptions([]);
      setLoading(false);
      return;
    }

    const key = loaderKey(effectiveLoader, search);
    const cached = choicesCache.get(key);
    if (cached && !search) {
      setOptions(cached);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await loadChoicesShared(
        effectiveLoader,
        dp,
        optionLabel,
        optionValue,
        search,
      );
      setOptions(result);
    } catch {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, [effectiveLoader, dp, optionLabel, optionValue, search]);

  useEffect(() => {
    void load();
  }, [load]);

  const labelForValue = useCallback(
    (value: unknown): string => {
      const opt = options.find((o) => o.value === value);
      return opt?.label ?? String(value ?? "—");
    },
    [options],
  );

  const labelsForValues = useCallback(
    (values: unknown[]): string => {
      if (!values?.length) return "—";
      return values.map((v) => labelForValue(v)).join(", ");
    },
    [labelForValue],
  );

  const optionForValue = useCallback(
    (value: unknown): ChoiceOption | undefined =>
      options.find((o) => o.value === value),
    [options],
  );

  return {
    options,
    loading,
    labelForValue,
    labelsForValues,
    optionForValue,
    reload: load,
  };
}
