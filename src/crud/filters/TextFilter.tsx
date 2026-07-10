import { Input } from "antd";
import { useEffect, useMemo, useState } from "react";
import type { BaseSourceProps } from "../types";
import { useFilterContext, useRegisterFilter } from "../context/FilterContext";
import { useDebouncedValue } from "../utils/useDebouncedValue";

/** Default debounce for list text filters (ms). */
export const DEFAULT_TEXT_FILTER_DEBOUNCE_MS = 300;

export type TextFilterProps = BaseSourceProps & {
  placeholder?: string;
  /**
   * Debounce delay before applying the filter to the list / URL (ms).
   * Defaults to `ResourceList` `textFilterDebounceMs`, then {@link DEFAULT_TEXT_FILTER_DEBOUNCE_MS}.
   * Set `0` for immediate apply (legacy behavior).
   */
  debounceMs?: number;
};

function normalizeFilterText(value: unknown): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  return String(value);
}

function TextFilterInput({
  value,
  onChange,
  placeholder,
  debounceMs,
}: {
  value: unknown;
  onChange: (value: unknown) => void;
  placeholder?: string;
  debounceMs: number;
}) {
  const [draft, setDraft] = useState(() => (value as string) ?? "");
  const debouncedDraft = useDebouncedValue(draft, debounceMs);

  useEffect(() => {
    setDraft((value as string) ?? "");
  }, [value]);

  useEffect(() => {
    if (debounceMs <= 0) return;
    // Ignore stale debounced values while the user is still typing or after an immediate clear.
    if (debouncedDraft !== draft) return;
    const next = normalizeFilterText(debouncedDraft);
    const current = normalizeFilterText(value);
    if (next !== current) {
      onChange(next);
    }
  }, [debouncedDraft, draft, debounceMs, onChange, value]);

  return (
    <Input
      allowClear
      placeholder={placeholder}
      value={draft}
      onChange={(e) => {
        const nextDraft = e.target.value;
        setDraft(nextDraft);
        if (debounceMs <= 0 || nextDraft === "") {
          onChange(normalizeFilterText(nextDraft));
        }
      }}
      style={{ minWidth: 160 }}
    />
  );
}

export function TextFilter({
  source,
  label,
  placeholder,
  debounceMs: debounceMsProp,
}: TextFilterProps) {
  const filterCtx = useFilterContext();
  const debounceMs =
    debounceMsProp ??
    filterCtx?.textFilterDebounceMs ??
    DEFAULT_TEXT_FILTER_DEBOUNCE_MS;

  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      render: ({
        value,
        onChange,
      }: {
        value: unknown;
        onChange: (value: unknown) => void;
      }) => (
        <TextFilterInput
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? label ?? source}
          debounceMs={debounceMs}
        />
      ),
    }),
    [source, label, placeholder, debounceMs],
  );
  useRegisterFilter(def);
  return null;
}
