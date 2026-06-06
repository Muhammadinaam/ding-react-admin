import { ReactElement } from 'react';
export declare function Guard({ when, redirect, children, }: {
    when: boolean;
    redirect: string;
    children: ReactElement;
}): import("react/jsx-runtime").JSX.Element;
export declare function Protected({ children, redirectTo, }: {
    children: ReactElement;
    redirectTo?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function GuestOnly({ children, redirectTo, }: {
    children: ReactElement;
    redirectTo?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=guards.d.ts.map