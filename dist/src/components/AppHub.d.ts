import { NavItem } from '../types';
export type AppHubProps = {
    apps: NavItem[];
    onAppClick?: (app: NavItem) => void;
    className?: string;
};
export declare function AppHub({ apps, onAppClick, className }: AppHubProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AppHub.d.ts.map