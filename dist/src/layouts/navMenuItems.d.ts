import { MenuProps } from 'antd';
import { NavItem } from '../types';
export declare function navItemsToAntdItems(items: NavItem[], options?: {
    showLabelTooltip?: boolean;
    wrapLabels?: boolean;
    /** Collapsed sider: native `title` for icon tooltips only. */
    collapsed?: boolean;
}): NonNullable<MenuProps["items"]>;
//# sourceMappingURL=navMenuItems.d.ts.map