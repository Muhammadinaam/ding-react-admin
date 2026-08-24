import type { ReactNode } from "react";
import type { NavItem } from "../types";

export type FlatNavItem = {
  path: string;
  label: ReactNode;
  group?: string;
  Icon?: NavItem["Icon"];
};

export function getNavItemLabel(item: Pick<NavItem, "label">): string {
  const { label } = item;
  if (typeof label === "string") return label;
  if (typeof label === "number") return String(label);
  return "";
}

export function filterNavItems(items: NavItem[], query: string): NavItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  function walk(nodes: NavItem[]): NavItem[] {
    const result: NavItem[] = [];
    for (const node of nodes) {
      const label = getNavItemLabel(node).toLowerCase();
      const selfMatch = label.includes(q);

      if (node.children?.length) {
        const filteredChildren = walk(node.children);
        if (selfMatch) {
          result.push(node);
        } else if (filteredChildren.length > 0) {
          result.push({ ...node, children: filteredChildren });
        }
      } else if (selfMatch) {
        result.push(node);
      }
    }
    return result;
  }

  return walk(items);
}

/** Leaf menu rows from a nav tree, optionally tagged with an app/group name. */
export function flattenNavLeaves(
  items: NavItem[],
  options?: { group?: string },
): FlatNavItem[] {
  const group = options?.group;
  const result: FlatNavItem[] = [];

  function walk(nodes: NavItem[]) {
    for (const node of nodes) {
      if (node.children?.length) {
        walk(node.children);
      } else {
        result.push({
          path: node.path,
          label: node.label,
          Icon: node.Icon,
          group,
        });
      }
    }
  }

  walk(items);
  return result;
}

export function filterFlatNavItems(
  items: FlatNavItem[],
  query: string,
): FlatNavItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return items.filter((item) => {
    const label = getNavItemLabel(item).toLowerCase();
    const group = (item.group ?? "").toLowerCase();
    return label.includes(q) || group.includes(q);
  });
}

export function collectSubmenuKeys(items: NavItem[]): string[] {
  const keys: string[] = [];
  function walk(nodes: NavItem[]) {
    for (const node of nodes) {
      if (node.children?.length) {
        keys.push(node.path);
        walk(node.children);
      }
    }
  }
  walk(items);
  return keys;
}
