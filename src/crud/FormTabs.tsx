import { Tabs, type TabsProps } from "antd";
import {
  Children,
  isValidElement,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";

export type FormTabProps = {
  label: ReactNode;
  children: ReactNode;
  disabled?: boolean;
};

export function FormTab(_props: FormTabProps) {
  return null;
}

function isFormTab(child: ReactNode): child is ReactElement<FormTabProps> {
  return isValidElement(child) && child.type === FormTab;
}

export type FormTabsProps = Omit<TabsProps, "items"> & {
  children: ReactNode;
};

export function FormTabs({ children, ...tabsProps }: FormTabsProps) {
  const items = useMemo(
    () =>
      Children.toArray(children)
        .filter(isFormTab)
        .map((tab, index) => ({
          key: (tab.key as string | undefined) ?? String(index),
          label: tab.props.label,
          disabled: tab.props.disabled,
          children: tab.props.children,
        })),
    [children],
  );

  return <Tabs destroyOnHidden={false} items={items} {...tabsProps} />;
}
