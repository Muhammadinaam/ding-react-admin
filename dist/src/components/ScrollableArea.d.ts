import { CSSProperties, ReactNode } from 'react';
export type ScrollableAreaProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Use lighter thumbs on dark sidebar backgrounds. */
    variant?: "default" | "on-dark";
};
export declare const ScrollableArea: import('react').ForwardRefExoticComponent<ScrollableAreaProps & import('react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScrollableArea.d.ts.map