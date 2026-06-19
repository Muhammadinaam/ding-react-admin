import { useEffect, useState } from "react";
import type { UploadFieldValue } from "./uploadFieldUtils";

/** Preview URL for uploads — `URL.createObjectURL` for `File`, direct URL for existing strings. */
export function useUploadPreviewUrl(value: UploadFieldValue): string | undefined {
  const [objectUrl, setObjectUrl] = useState<string | undefined>();

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setObjectUrl(undefined);
  }, [value]);

  if (value instanceof File) return objectUrl;
  if (typeof value === "string" && value.length > 0) return value;
  return undefined;
}
