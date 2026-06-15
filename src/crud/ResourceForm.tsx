import { ArrowLeftOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Space, Spin, Typography, theme } from "antd";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDataProvider } from "../context/DataProvider";
import { usePermissions } from "../context/PermissionsProvider";
import type { ResourcePermissions } from "../permissions/resourcePermissions";
import { checkResourcePermission } from "../permissions/resourcePermissions";
import { FormMetaProvider } from "./context/FormContext";
import { FormFieldsProvider } from "./context/FormFieldsContext";
import { pickBySources } from "./utils/pickBySources";
import {
  loadInlineRows,
  saveInlineRows,
  type InlineFormSetProps,
} from "./InlineFormSet";
import { inlineArrayName } from "./utils/inlineArrayName";
import { parseAndApplyFormErrors } from "./utils/formErrors";
import { useAbortableEffect } from "./utils/useAbortableEffect";
import { isAbortError } from "../data/abortError";

export type ResourceFormInlineConfig = Pick<
  InlineFormSetProps,
  "resource" | "foreignKey" | "name"
>;

export type ResourceFormProps<T extends FieldValues> = {
  resource: string;
  title: string;
  listPath: string;
  children: ReactNode;
  defaultValues?: Partial<T>;
  onSaved?: (record: T) => void;
  stayOnPage?: boolean;
  inlines?: ResourceFormInlineConfig[];
  /** Permission strings for create vs edit. Omit to allow all (demos only). */
  permissions?: Pick<ResourcePermissions, "add" | "change">;
};

function resolveInlineArrayName(config: ResourceFormInlineConfig) {
  return inlineArrayName(config.resource, config.name);
}

export function ResourceForm<T extends FieldValues & { id?: unknown }>({
  resource,
  title,
  listPath,
  children,
  defaultValues,
  onSaved,
  stayOnPage,
  inlines,
  permissions,
}: ResourceFormProps<T>) {
  const { id } = useParams();
  const isNew = id === "new" || !id;
  const dp = useDataProvider();
  const can = usePermissions();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(!isNew);
  const [formVersion, setFormVersion] = useState(0);
  const [existingInlineIds, setExistingInlineIds] = useState<
    Record<string, (string | number)[]>
  >({});

  const form = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const fieldSourcesRef = useRef(new Set<string>());

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (isNew || !id) {
        if (defaultValues) {
          form.reset({ ...defaultValues } as DefaultValues<T>);
        }
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await dp.getOne(resource, id, { signal });
        if (signal?.aborted) return;
        const record = res.data as DefaultValues<T>;
        if (inlines?.length) {
          const merged = { ...record } as DefaultValues<T>;
          const idsMap: Record<string, (string | number)[]> = {};
          for (const cfg of inlines) {
            const arrayName = resolveInlineArrayName(cfg);
            const { rows, ids } = await loadInlineRows(
              dp,
              cfg.resource,
              cfg.foreignKey,
              id,
            );
            (merged as Record<string, unknown>)[arrayName] = rows;
            idsMap[arrayName] = ids;
          }
          if (signal?.aborted) return;
          form.reset(merged);
          setExistingInlineIds(idsMap);
          setFormVersion((v) => v + 1);
        } else {
          form.reset(record);
          setFormVersion((v) => v + 1);
        }
      } catch (e) {
        if (!isAbortError(e)) {
          message.error(e instanceof Error ? e.message : "Load failed");
        }
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [dp, resource, id, isNew, form, message, defaultValues, inlines],
  );

  useAbortableEffect((signal) => load(signal), [load]);

  useEffect(() => {
    if (!permissions) return;
    const slot = isNew ? "add" : "change";
    if (!checkResourcePermission(can, permissions, slot)) {
      navigate(listPath, { replace: true });
    }
  }, [permissions, isNew, can, navigate, listPath]);

  const canSave = permissions
    ? checkResourcePermission(can, permissions, isNew ? "add" : "change")
    : true;

  async function onSubmit(values: T) {
    try {
      const raw = values as Record<string, unknown>;
      let payload = pickBySources(raw, Array.from(fieldSourcesRef.current));
      if (inlines?.length) {
        for (const cfg of inlines) {
          delete payload[resolveInlineArrayName(cfg)];
        }
      }

      let saved: T;
      if (isNew) {
        const res = await dp.create(resource, payload);
        saved = res.data as T;
        message.success("Created");
      } else if (id) {
        const res = await dp.update(resource, { id, data: payload });
        saved = res.data as T;
        message.success("Updated");
      } else {
        return;
      }

      const parentId = saved.id as string | number;
      if (inlines?.length && parentId != null) {
        for (const cfg of inlines) {
          const arrayName = resolveInlineArrayName(cfg);
          const rows =
            ((form.getValues(arrayName as never) as unknown) as
              Record<string, unknown>[] | undefined) ?? [];
          const inlineOk = await saveInlineRows(dp, {
            resource: cfg.resource,
            foreignKey: cfg.foreignKey,
            parentId,
            rows,
            existingIds: existingInlineIds[arrayName] ?? [],
            onRowError: (e, index) => {
              const row = rows[index];
              const rowId = row?.id as string | number | undefined;
              return parseAndApplyFormErrors(dp, form, message, e, {
                resource: cfg.resource,
                mutation:
                  rowId != null &&
                  (existingInlineIds[arrayName] ?? []).some((id) => id === rowId)
                    ? "update"
                    : "create",
                inlineArrayName: arrayName,
                rowIndex: index,
              });
            },
          });
          if (!inlineOk) return;
        }
      }

      onSaved?.(saved);
      if (!stayOnPage) navigate(listPath);
    } catch (e) {
      parseAndApplyFormErrors(dp, form, message, e, {
        resource,
        mutation: isNew ? "create" : "update",
      });
      message.error(e instanceof Error ? e.message : "Save failed");
      
    }
  }

  return (
    <Card
      title={
        <Space>
          <Link to={listPath} style={{ color: token.colorText }}>
            <ArrowLeftOutlined /> Back
          </Link>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
        </Space>
      }
    >
      <FormMetaProvider resource={resource} isNew={isNew}>
        <FormFieldsProvider sourcesRef={fieldSourcesRef}>
        <div style={{ position: "relative" }}>
          {loading ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Spin />
            </div>
          ) : null}
          <FormProvider {...form} key={formVersion}>
            <Form
              layout="vertical"
              onFinish={() => void form.handleSubmit(onSubmit)()}
              style={{
                opacity: loading ? 0.4 : 1,
                pointerEvents: loading ? "none" : undefined,
              }}
            >
              {children}
              <Form.Item style={{ marginTop: 16 }}>
                <Space>
                  <Button type="primary" htmlType="submit" disabled={loading || !canSave}>
                    Save
                  </Button>
                  <Link to={listPath}>
                    <Button disabled={loading}>Cancel</Button>
                  </Link>
                </Space>
              </Form.Item>
            </Form>
          </FormProvider>
        </div>
        </FormFieldsProvider>
      </FormMetaProvider>
    </Card>
  );
}
