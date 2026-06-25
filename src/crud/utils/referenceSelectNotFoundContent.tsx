import { Spin } from "antd";
import type { ReactNode } from "react";

/** Hide Ant Design Select "No data" while options are loading. */
export function referenceSelectNotFoundContent(loading: boolean): ReactNode {
  return loading ? <Spin size="small" /> : undefined;
}
