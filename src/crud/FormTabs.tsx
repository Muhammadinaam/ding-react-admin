import { Tabs, theme, type TabsProps } from "antd";
import {
  Children,
  isValidElement,
  useCallback,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { FormSectionSourcesProvider } from "./context/FormSectionContext";
import {
  sectionHasError,
  useActivateFirstErrorSection,
  useSectionSourceRefs,
} from "./utils/formSectionErrors";

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

export function FormTabs({
  children,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  ...tabsProps
}: FormTabsProps) {
  const { token } = theme.useToken();
  const tabs = useMemo(
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

  const sectionRefs = useSectionSourceRefs(tabs.length);
  const isControlled = controlledActiveKey !== undefined;
  const [internalActiveKey, setInternalActiveKey] = useState(
    () => (defaultActiveKey as string | undefined) ?? tabs[0]?.key ?? "0",
  );
  const activeKey = isControlled ? controlledActiveKey : internalActiveKey;

  const setActiveKey = useCallback(
    (key: string) => {
      if (!isControlled) {
        setInternalActiveKey(key);
      }
      onChange?.(key);
    },
    [isControlled, onChange],
  );

  const activateByIndex = useCallback(
    (index: number) => {
      const key = tabs[index]?.key;
      if (key != null) {
        setActiveKey(key);
      }
    },
    [setActiveKey, tabs],
  );

  useActivateFirstErrorSection(sectionRefs, activateByIndex);

  const { control, getFieldState } = useFormContext();
  const formState = useFormState({ control });

  const items = useMemo(
    () =>
      tabs.map((tab, index) => {
        const hasError = sectionHasError(
          sectionRefs[index].current,
          getFieldState,
          formState,
        );

        return {
          key: tab.key,
          label: hasError ? (
            <span style={{ color: token.colorError }}>{tab.label}</span>
          ) : (
            tab.label
          ),
          disabled: tab.disabled,
          children: (
            <FormSectionSourcesProvider sourcesRef={sectionRefs[index]}>
              {tab.children}
            </FormSectionSourcesProvider>
          ),
        };
      }),
    [formState, getFieldState, sectionRefs, tabs, token.colorError],
  );

  return (
    <Tabs
      destroyOnHidden={false}
      items={items}
      activeKey={activeKey}
      onChange={setActiveKey}
      {...tabsProps}
    />
  );
}
