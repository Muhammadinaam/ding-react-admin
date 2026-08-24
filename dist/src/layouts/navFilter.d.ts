import { ReactNode } from 'react';
import { NavItem } from '../types';
export type FlatNavItem = {
    path: string;
    label: ReactNode;
    group?: string;
    Icon?: NavItem["Icon"];
};
export declare function getNavItemLabel(item: Pick<NavItem, "label">): string;
export declare function filterNavItems(items: NavItem[], query: string): NavItem[];
/** Leaf menu rows from a nav tree, optionally tagged with an app/group name. */
export declare function flattenNavLeaves(items: NavItem[], options?: {
    group?: string;
}): FlatNavItem[];
export declare function filterFlatNavItems(items: FlatNavItem[], query: string): FlatNavItem[];
export declare function collectSubmenuKeys(items: NavItem[]): string[];
//# sourceMappingURL=navFilter.d.ts.map