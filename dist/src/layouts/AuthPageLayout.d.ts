import { ReactNode } from 'react';
export type AuthPageLayoutProps = {
    children: ReactNode;
    /** Brand mark centered above the card. */
    brand?: ReactNode;
    /** Row below the card (e.g. link to register or login). */
    footer?: ReactNode;
    showThemeToolbar?: boolean;
};
export declare function AuthPageLayout({ children, brand, footer, showThemeToolbar, }: AuthPageLayoutProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AuthPageLayout.d.ts.map