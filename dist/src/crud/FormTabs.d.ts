import { TabsProps } from 'antd';
import { ReactNode } from 'react';
export type FormTabProps = {
    label: ReactNode;
    children: ReactNode;
    disabled?: boolean;
};
export declare function FormTab(_props: FormTabProps): null;
export type FormTabsProps = Omit<TabsProps, "items"> & {
    children: ReactNode;
};
export declare function FormTabs({ children, ...tabsProps }: FormTabsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FormTabs.d.ts.map