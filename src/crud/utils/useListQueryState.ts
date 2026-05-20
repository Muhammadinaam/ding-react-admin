import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { SortSpec } from "../../data/dataProviderTypes";
import { LIST_QUERY_RESERVED } from "../types";
import { parseSortParam, serializeSort } from "./sortQueryParam";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

function parseFilterValue(raw: string): unknown {
  if (raw.includes(",")) {
    const parts = raw.split(",").map((p) => p.trim());
    const nums = parts.map(Number);
    if (nums.every((n) => Number.isFinite(n))) return nums;
    return parts;
  }
  const n = Number(raw);
  if (raw !== "" && Number.isFinite(n) && String(n) === raw) return n;
  if (raw === "true") return true;
  if (raw === "false") return false;
  return raw;
}

function serializeFilterValue(value: unknown): string | null {
  if (value === undefined || value === null || value === "") return null;
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return value.map(String).join(",");
  }
  return String(value);
}

export type ListQueryState = {
  page: number;
  perPage: number;
  sort: SortSpec[];
  filter: Record<string, unknown>;
  createModal: boolean;
  editId: string | null;
};

export type ListQueryActions = {
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setSort: (sort: SortSpec[]) => void;
  toggleSort: (field: string) => void;
  setFilter: (source: string, value: unknown) => void;
  setFilters: (filter: Record<string, unknown>) => void;
  openCreateModal: () => void;
  openEditModal: (id: string | number) => void;
  closeModal: () => void;
};

export function useListQueryState(
  staticFilter?: Record<string, unknown>,
): [ListQueryState, ListQueryActions] {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo((): ListQueryState => {
    const pageRaw = searchParams.get("page");
    const perPageRaw = searchParams.get("perPage");
    const page = pageRaw ? Math.max(1, Number(pageRaw) || DEFAULT_PAGE) : DEFAULT_PAGE;
    const perPage = perPageRaw
      ? Math.max(1, Number(perPageRaw) || DEFAULT_PER_PAGE)
      : DEFAULT_PER_PAGE;

    const sortEntries = searchParams.getAll("sort");
    const sort =
      sortEntries.length > 0
        ? sortEntries.flatMap((s) => parseSortParam(s))
        : parseSortParam(searchParams.get("sort"));

    const filter: Record<string, unknown> = { ...staticFilter };
    searchParams.forEach((value, key) => {
      if (LIST_QUERY_RESERVED.has(key)) return;
      const existing = filter[key];
      if (existing !== undefined) {
        const arr = Array.isArray(existing) ? existing : [existing];
        filter[key] = [...arr, parseFilterValue(value)];
      } else if (searchParams.getAll(key).length > 1) {
        filter[key] = searchParams.getAll(key).map(parseFilterValue);
      } else {
        filter[key] = parseFilterValue(value);
      }
    });

    const createModal = searchParams.has("create");
    const editId = searchParams.get("edit");

    return { page, perPage, sort, filter, createModal, editId };
  }, [searchParams, staticFilter]);

  const updateParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          mutate(next);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const actions: ListQueryActions = useMemo(
    () => ({
      setPage: (page) => {
        updateParams((p) => {
          if (page <= 1) p.delete("page");
          else p.set("page", String(page));
        });
      },
      setPerPage: (perPage) => {
        updateParams((p) => {
          if (perPage === DEFAULT_PER_PAGE) p.delete("perPage");
          else p.set("perPage", String(perPage));
          p.delete("page");
        });
      },
      setSort: (sort) => {
        updateParams((p) => {
          p.delete("sort");
          const serialized = serializeSort(sort);
          if (serialized) p.set("sort", serialized);
        });
      },
      toggleSort: (field) => {
        updateParams((p) => {
          const current = p.getAll("sort").flatMap((s) => parseSortParam(s));
          const idx = current.findIndex((s) => s.field === field);
          let next: SortSpec[];
          if (idx < 0) {
            next = [...current, { field, order: "ASC" }];
          } else if (current[idx].order === "ASC") {
            next = current.map((s, i) =>
              i === idx ? { ...s, order: "DESC" as const } : s,
            );
          } else {
            next = current.filter((_, i) => i !== idx);
          }
          p.delete("sort");
          const serialized = serializeSort(next);
          if (serialized) p.set("sort", serialized);
        });
      },
      setFilter: (source, value) => {
        updateParams((p) => {
          p.delete(source);
          const serialized = serializeFilterValue(value);
          if (serialized != null) p.set(source, serialized);
          p.delete("page");
        });
      },
      setFilters: (filter) => {
        updateParams((p) => {
          for (const key of [...p.keys()]) {
            if (!LIST_QUERY_RESERVED.has(key)) p.delete(key);
          }
          for (const [key, value] of Object.entries(filter)) {
            const serialized = serializeFilterValue(value);
            if (serialized != null) p.set(key, serialized);
          }
          p.delete("page");
        });
      },
      openCreateModal: () => {
        updateParams((p) => {
          p.set("create", "1");
          p.delete("edit");
        });
      },
      openEditModal: (id) => {
        updateParams((p) => {
          p.set("edit", String(id));
          p.delete("create");
        });
      },
      closeModal: () => {
        updateParams((p) => {
          p.delete("create");
          p.delete("edit");
        });
      },
    }),
    [updateParams],
  );

  return [state, actions];
}
