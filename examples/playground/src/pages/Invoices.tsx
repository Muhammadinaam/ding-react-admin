import { Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { CrudForm } from "../components/crud/CrudForm";
import { CrudTable } from "../components/crud/CrudTable";
import type { Invoice } from "../api/memoryApi";

type InvoiceRow = Invoice & Record<string, unknown>;

export function InvoiceListPage() {
  const columns: ColumnsType<InvoiceRow> = [
    { title: "Number", dataIndex: "number" },
    { title: "Customer", dataIndex: "customer" },
    { title: "Issued", dataIndex: "issuedAt" },
    {
      title: "Lines",
      key: "lines",
      render: (_, row) => (
        <Link to={`/invoice-lines?invoiceId=${row.id}`}>View lines</Link>
      ),
    },
  ];
  return (
    <CrudTable<InvoiceRow>
      resource="invoices"
      title="Invoices"
      columns={columns}
      pathPrefix="/invoices"
    />
  );
}

export function InvoiceFormPage() {
  return (
    <CrudForm<InvoiceRow>
      resource="invoices"
      title="Invoice"
      listPath="/invoices"
    >
      {() => (
        <>
          <Form.Item name="number" label="Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="customer" label="Customer" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="issuedAt" label="Issued (YYYY-MM-DD)" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
        </>
      )}
    </CrudForm>
  );
}
