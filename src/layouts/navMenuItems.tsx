import type { MenuProps } from "antd";
import { NavMenuLabel } from "../components/NavMenuLabel";
import type { NavItem } from "../types";
import { getNavItemLabel } from "./navFilter";

export function navItemsToAntdItems(
  items: NavItem[],
  options?: {
    showLabelTooltip?: boolean;
    wrapLabels?: boolean;
    /** Collapsed sider: native `title` for icon tooltips only. */
    collapsed?: boolean;
  },
): NonNullable<MenuProps["items"]> {
  const showLabelTooltip = options?.showLabelTooltip !== false;
  const wrapLabels = options?.wrapLabels === true;
  const collapsed = options?.collapsed === true;

  return items.map((item) => {
    const IconComp = item.Icon;
    const icon = IconComp ? <IconComp /> : undefined;
    const title = getNavItemLabel(item);
    const label =
      title && showLabelTooltip ? (
        <NavMenuLabel label={item.label} title={title} />
      ) : wrapLabels ? (
        <NavMenuLabel label={item.label} title="" />
      ) : (
        item.label
      );

    // Expanded: NavMenuLabel tooltip only (omit `title` to avoid native DOM tooltip).
    // Collapsed: string title for the sider icon tooltip.
    const itemTitle: { title?: string } =
      collapsed && title ? { title } : {};

    if (item.children?.length) {
      return {
        key: item.path,
        icon,
        label,
        ...itemTitle,
        children: navItemsToAntdItems(item.children, options),
      };
    }
    return {
      key: item.path,
      icon,
      label,
      ...itemTitle,
    };
  });
}
