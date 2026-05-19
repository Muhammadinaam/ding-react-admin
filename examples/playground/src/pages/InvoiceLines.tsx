import { Form, Input, InputNumber, Select } from "antd";
import { useDataProvider } from "ding-react-admin";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CrudForm } from "../components/crud/CrudForm";
import { CrudTable } from "../components/crud/CrudTable";
import type { Invoice, InvoiceLine, Product } from "../api/memoryApi";
import type { FormInstance } from "antd/es/form";

type LineRow = InvoiceLine & Record<string, unknown>;

export function InvoiceLineListPage() {
  const [params] = useSearchParams();
  const invoiceIdRaw = params.get("invoiceId");
  const filter = useMemo(() => {
    if (!invoiceIdRaw) return undefined;
    const n = Number(invoiceIdRaw);
    return Number.isFinite(n) ? { invoiceId: n } : undefined;
  }, [invoiceIdRaw]);

  const columns: ColumnsType<LineRow> = [
    { title: "Invoice id", dataIndex: "invoiceId", width: 110 },
    {
      title: "Product id",
      dataIndex: "productId",
      render: (v: number | null) => v ?? "—",
    },
    { title: "Label", dataIndex: "label" },
    { title: "Qty", dataIndex: "quantity" },
    { title: "Unit", dataIndex: "unitPrice" },
  ];

  const title =
    filter?.invoiceId != null
      ? `Invoice lines · invoice ${String(filter.invoiceId)}`
      : "Invoice lines";

  return (
    <CrudTable<LineRow>
      resource="invoice-lines"
      title={title}
      columns={columns}
      pathPrefix="/invoice-lines"
      newPath={
        filter?.invoiceId != null
          ? `/invoice-lines/new?invoiceId=${String(filter.invoiceId)}`
          : undefined
      }
      filter={filter}
    />
  );
}

type FieldsProps = {
  form: FormInstance<LineRow>;
  isNew: boolean;
  presetInvoiceId: string | null;
};

function InvoiceLineFormFields({ form, isNew, presetInvoiceId }: FieldsProps) {
  const dp = useDataProvider();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [inv, prod] = await Promise.all([
          dp.getList("invoices", {}),
          dp.getList("products", {}),
        ]);
        if (!cancelled) {
          setInvoices(inv.data as unknown as Invoice[]);
          setProducts(prod.data as unknown as Product[]);
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dp]);

  useEffect(() => {
    if (!isNew || !presetInvoiceId) return;
    const n = Number(presetInvoiceId);
    if (Number.isFinite(n)) {
      form.setFieldValue("invoiceId", n);
    }
  }, [form, isNew, presetInvoiceId]);

  return (
    <>
      <Form.Item name="invoiceId" label="Invoice" rules={[{ required: true }]}>
        <Select
          disabled={Boolean(presetInvoiceId)}
          options={invoices.map((i) => ({
            label: `${i.number} (#${i.id})`,
            value: i.id,
          }))}
        />
      </Form.Item>
      <Form.Item name="productId" label="Product (optional)">
        <Select
          allowClear
          options={products.map((p) => ({
            label: `${p.name} (#${p.id})`,
            value: p.id,
          }))}
        />
      </Form.Item>
      <Form.Item name="label" label="Label" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
        <InputNumber min={0} step={1} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="unitPrice" label="Unit price" rules={[{ required: true }]}>
        <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
      </Form.Item>
    </>
  );
}

export function InvoiceLineFormPage() {
  const [params] = useSearchParams();
  const invoiceIdFromQuery = params.get("invoiceId");
  const listPath =
    invoiceIdFromQuery != null
      ? `/invoice-lines?invoiceId=${invoiceIdFromQuery}`
      : "/invoice-lines";

  return (
    <CrudForm<LineRow>
      resource="invoice-lines"
      title="Invoice line"
      listPath={listPath}
    >
      {({ form, isNew }) => (
        <InvoiceLineFormFields
          form={form}
          isNew={isNew}
          presetInvoiceId={invoiceIdFromQuery}
        />
      )}
    </CrudForm>
  );
}
