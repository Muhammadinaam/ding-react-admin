import type { NavItem } from "../types";

export function getNavItemLabel(item: NavItem): string {
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
