import { ArrowLeftOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Space, Spin, Typography, theme } from "antd";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDataProvider } from "../context/DataProvider";
import { FormMetaProvider } from "./context/FormContext";
import {
  loadInlineRows,
  saveInlineRows,
  type InlineFormSetProps,
} from "./InlineFormSet";
import { inlineArrayName } from "./utils/inlineArrayName";

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
}: ResourceFormProps<T>) {
  const { id } = useParams();
  const isNew = id === "new" || !id;
  const dp = useDataProvider();
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

  const loadInlines = useCallback(
    async (parentId: string | number) => {
      if (!inlines?.length) return;
      const idsMap: Record<string, (string | number)[]> = {};
      for (const cfg of inlines) {
        const arrayName = resolveInlineArrayName(cfg);
        const { rows, ids } = await loadInlineRows(
          dp,
          cfg.resource,
          cfg.foreignKey,
          parentId,
        );
        form.setValue(
          arrayName as never,
          rows as never,
        );
        idsMap[arrayName] = ids;
      }
      setExistingInlineIds(idsMap);
    },
    [dp, inlines, form],
  );

  const load = useCallback(async () => {
    if (isNew || !id) {
      if (defaultValues) {
        form.reset({ ...defaultValues } as DefaultValues<T>);
      }
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await dp.getOne(resource, id);
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
        form.reset(merged);
        setExistingInlineIds(idsMap);
        setFormVersion((v) => v + 1);
      } else {
        form.reset(record);
        setFormVersion((v) => v + 1);
      }
    } catch (e) {
      message.error(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [dp, resource, id, isNew, form, message, defaultValues, loadInlines]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onSubmit(values: T) {
    try {
      const payload = { ...values } as Record<string, unknown>;
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
          await saveInlineRows(dp, {
            resource: cfg.resource,
            foreignKey: cfg.foreignKey,
            parentId,
            rows,
            existingIds: existingInlineIds[arrayName] ?? [],
          });
        }
      }

      onSaved?.(saved);
      if (!stayOnPage) navigate(listPath);
    } catch (e) {
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
                  <Button type="primary" htmlType="submit" disabled={loading}>
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
      </FormMetaProvider>
    </Card>
  );
}
