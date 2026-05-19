import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Card,
  Form,
  Space,
  Spin,
  Typography,
  theme,
} from "antd";
import { useDataProvider } from "ding-react-admin";
import type { FormInstance } from "antd/es/form";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export type CrudFormProps<T extends Record<string, unknown>> = {
  resource: string;
  title: string;
  listPath: string;
  /** Renders fields; receives form instance and record (in edit mode). */
  children: (ctx: {
    form: FormInstance<T>;
    initial?: T;
    isNew: boolean;
  }) => ReactNode;
};

export function CrudForm<T extends Record<string, unknown>>({
  resource,
  title,
  listPath,
  children,
}: CrudFormProps<T>) {
  const { id } = useParams();
  const isNew = id === "new" || !id;
  const dp = useDataProvider();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { token } = theme.useToken();
  const [form] = Form.useForm<T>();
  const [loading, setLoading] = useState(!isNew);
  const [initial, setInitial] = useState<T | undefined>();

  const load = useCallback(async () => {
    if (isNew || !id) return;
    setLoading(true);
    try {
      const res = await dp.getOne(resource, id);
      const row = res.data as T;
      setInitial(row);
      (form as FormInstance).setFieldsValue(res.data as Record<string, unknown>);
    } catch (e) {
      message.error(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [dp, resource, id, isNew, form, message]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onFinish(values: T) {
    try {
      if (isNew) {
        await dp.create(resource, values);
        message.success("Created");
      } else if (id) {
        await dp.update(resource, { id, data: values });
        message.success("Updated");
      }
      navigate(listPath);
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
      {loading ? (
        <Spin />
      ) : (
        <Form<T>
          key={id ?? "new"}
          form={form}
          layout="vertical"
          onFinish={(v) => void onFinish(v)}
          style={{ maxWidth: 520 }}
        >
          {children({ form, initial, isNew })}
          <Form.Item style={{ marginTop: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Link to={listPath}>
                <Button>Cancel</Button>
              </Link>
            </Space>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
}
