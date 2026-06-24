import { useCallback, useEffect, useMemo, useState } from "react";
import { useDataProvider } from "../../context/DataProvider";
import type { Identifier } from "../../data/dataProviderTypes";
import type { ChoiceOption, ChoicesLoader } from "../types";
import {
  collectSelectedRecords,
  mergeOptions,
  normalizeSelectedIds,
  recordsToOptions,
  resolveOptionLabel,
} from "./choiceSelectionUtils";

const choicesCache = new Map<string, ChoiceOption[]>();
const choicesInflight = new Map<string, Promise<ChoiceOption[]>>();

export type UseChoicesOptions = {
  /** When true, the option list loads only while the dropdown is open or the user is searching. */
  lazy?: boolean;
  /** Dropdown open or active search — triggers lazy list loading. */
  active?: boolean;
  /**
   * Current field value — primitive id(s), nested object(s), or mixed.
   * Objects shaped like `{ id, name, … }` are turned into options without `getOne`.
   */
  selectedValues?: unknown | unknown[];
  /**
   * Related record(s) from the loaded form row (e.g. `recordSource="branch"`).
   * Used to show labels on edit when the retrieve API embeds relations.
   */
  selectedRecords?: Record<string, unknown> | Record<string, unknown>[];
  /**
   * When true (default), fetch labels for primitive ids via `getOne` if they are
   * not already known from `selectedValues` / `selectedRecords`.
   */
  fetchSelected?: boolean;
  /**
   * Cache list results in memory. Defaults to `false` when `lazy` is true so each
   * dropdown open refetches; eager loads (e.g. table columns) default to `true`.
   */
  cache?: boolean;
};

function loaderKey(loader: ChoicesLoader, search?: string): string {
  if (typeof loader === "function") return `fn:${search ?? ""}`;
  if (Array.isArray(loader)) return `static:${loader.length}`;
  return `res:${loader.resource}:${JSON.stringify(loader.filter ?? {})}:${search ?? ""}`;
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
  search: string | undefined,
  useCache: boolean,
): Promise<ChoiceOption[]> {
  const key = loaderKey(effectiveLoader, search);
  if (useCache) {
    const cached = choicesCache.get(key);
    if (cached && !search) {
      return Promise.resolve(cached);
    }
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
      if (useCache && !search) choicesCache.set(key, result);
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
  hookOptions: UseChoicesOptions = {},
) {
  const {
    lazy = false,
    active = false,
    selectedValues,
    selectedRecords,
    fetchSelected = true,
    cache: cacheOption,
  } = hookOptions;
  const useCache = cacheOption ?? !lazy;
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

  const normalizedSelected = useMemo(
    () => normalizeSelectedIds(selectedValues, optionValue),
    [selectedValues, optionValue],
  );

  const embeddedOptions = useMemo(
    () =>
      recordsToOptions(
        collectSelectedRecords(selectedValues, selectedRecords, optionValue),
        optionLabel,
        optionValue,
      ),
    [selectedValues, selectedRecords, optionLabel, optionValue],
  );

  const shouldLoadList = Boolean(
    effectiveLoader && (!lazy || active || Array.isArray(effectiveLoader)),
  );

  const [options, setOptions] = useState<ChoiceOption[]>(() => {
    if (embeddedOptions.length) return embeddedOptions;
    if (!cacheKey || search || lazy || !useCache) return [];
    return choicesCache.get(cacheKey) ?? [];
  });

  const [loading, setLoading] = useState(() => {
    if (!shouldLoadList) return false;
    if (!useCache || !cacheKey || search) return Boolean(effectiveLoader);
    return !choicesCache.has(cacheKey);
  });

  useEffect(() => {
    if (!embeddedOptions.length) return;
    setOptions((prev) => mergeOptions(prev, embeddedOptions));
  }, [embeddedOptions]);

  const load = useCallback(async () => {
    if (!effectiveLoader || !shouldLoadList) {
      if (!effectiveLoader) {
        setOptions(embeddedOptions);
      }
      setLoading(false);
      return;
    }

    if (useCache) {
      const key = loaderKey(effectiveLoader, search);
      const cached = choicesCache.get(key);
      if (cached && !search) {
        setOptions(mergeOptions(embeddedOptions, cached));
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    if (lazy) {
      setOptions(embeddedOptions);
    }

    try {
      const result = await loadChoicesShared(
        effectiveLoader,
        dp,
        optionLabel,
        optionValue,
        search,
        useCache,
      );
      setOptions(mergeOptions(embeddedOptions, result));
    } catch {
      if (!normalizedSelected.length && !embeddedOptions.length) {
        setOptions([]);
      } else if (lazy) {
        setOptions(embeddedOptions);
      }
    } finally {
      setLoading(false);
    }
  }, [
    effectiveLoader,
    shouldLoadList,
    useCache,
    dp,
    optionLabel,
    optionValue,
    search,
    lazy,
    normalizedSelected.length,
    embeddedOptions,
  ]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (lazy && !active && !search) {
      setOptions(embeddedOptions);
      setLoading(false);
    }
  }, [lazy, active, search, embeddedOptions]);

  useEffect(() => {
    if (!fetchSelected || !reference || !normalizedSelected.length) return;

    const idsToFetch = normalizedSelected.filter(
      (value) => !embeddedOptions.some((option) => option.value === value),
    );
    if (!idsToFetch.length) return;

    let cancelled = false;

    void (async () => {
      const resolved: ChoiceOption[] = [];
      for (const value of idsToFetch) {
        try {
          const result = await dp.getOne(reference, value as Identifier);
          const row = result.data as Record<string, unknown>;
          resolved.push({
            label: resolveOptionLabel(row, optionLabel),
            value: row[optionValue],
            record: row,
          });
        } catch {
          resolved.push({
            label: String(value),
            value,
          });
        }
      }
      if (cancelled || !resolved.length) return;

      setOptions((prev) => {
        const missing = resolved.filter(
          (option) => !prev.some((existing) => existing.value === option.value),
        );
        return missing.length ? mergeOptions(prev, missing) : prev;
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [
    fetchSelected,
    reference,
    dp,
    optionLabel,
    optionValue,
    normalizedSelected,
    embeddedOptions,
  ]);

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
