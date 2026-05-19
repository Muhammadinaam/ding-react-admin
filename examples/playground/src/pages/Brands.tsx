import { Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CrudForm } from "../components/crud/CrudForm";
import { CrudTable } from "../components/crud/CrudTable";
import type { Brand } from "../api/memoryApi";

type BrandRow = Brand & Record<string, unknown>;

export function BrandListPage() {
  const columns: ColumnsType<BrandRow> = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Linked product id",
      dataIndex: "productId",
      render: (v: number | null) => v ?? "—",
    },
  ];
  return (
    <CrudTable<BrandRow>
      resource="brands"
      title="Brands"
      columns={columns}
      pathPrefix="/brands"
    />
  );
}

export function BrandFormPage() {
  return (
    <CrudForm<BrandRow> resource="brands" title="Brand" listPath="/brands">
      {() => (
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      )}
    </CrudForm>
  );
}
