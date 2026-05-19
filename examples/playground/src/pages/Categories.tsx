import { Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CrudForm } from "../components/crud/CrudForm";
import { CrudTable } from "../components/crud/CrudTable";
import type { Category } from "../api/memoryApi";

type CategoryRow = Category & Record<string, unknown>;

export function CategoryListPage() {
  const columns: ColumnsType<CategoryRow> = [{ title: "Name", dataIndex: "name" }];
  return (
    <CrudTable<CategoryRow>
      resource="categories"
      title="Categories"
      columns={columns}
      pathPrefix="/categories"
    />
  );
}

export function CategoryFormPage() {
  return (
    <CrudForm<CategoryRow>
      resource="categories"
      title="Category"
      listPath="/categories"
    >
      {() => (
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      )}
    </CrudForm>
  );
}
