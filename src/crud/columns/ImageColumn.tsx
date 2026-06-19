import { useMemo, type CSSProperties } from "react";
import type { BaseSourceProps } from "../types";
import { useRegisterColumn } from "../context/ListContext";

export type ImageColumnProps = BaseSourceProps & {
  sortable?: boolean;
  /** Thumbnail width in pixels. */
  width?: number;
  /** Thumbnail height in pixels. */
  height?: number;
  objectFit?: CSSProperties["objectFit"];
  borderRadius?: number;
  alt?: string;
};

export function ImageColumn({
  source,
  label,
  sortable = false,
  width = 40,
  height = 40,
  objectFit = "cover",
  borderRadius = 4,
  alt = "",
}: ImageColumnProps) {
  const def = useMemo(
    () => ({
      key: source,
      source,
      label,
      sortable,
      buildColumn: () => ({
        title: label ?? source,
        dataIndex: source,
        key: source,
        sorter: sortable ? true : undefined,
        render: (value: unknown) => {
          if (value == null || value === "") return null;
          return (
            <img
              src={String(value)}
              alt={alt}
              style={{
                width,
                height,
                objectFit,
                borderRadius,
              }}
            />
          );
        },
      }),
    }),
    [source, label, sortable, width, height, objectFit, borderRadius, alt],
  );
  useRegisterColumn(def);
  return null;
}
