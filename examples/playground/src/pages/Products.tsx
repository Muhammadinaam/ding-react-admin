import { Form, Input, InputNumber, Select } from "antd";
import { useDataProvider } from "ding-react-admin";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { CrudForm } from "../components/crud/CrudForm";
import { CrudTable } from "../components/crud/CrudTable";
import type { Brand, Category, Product } from "../api/memoryApi";

type ProductRow = Product & Record<string, unknown>;

export function ProductListPage() {
  const columns: ColumnsType<ProductRow> = [
    { title: "SKU", dataIndex: "sku" },
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    {
      title: "Brand id",
      dataIndex: "brandId",
      width: 100,
    },
    {
      title: "Categories",
      dataIndex: "categoryIds",
      render: (ids: number[]) => ids?.join(", "),
    },
  ];
  return (
    <CrudTable<ProductRow>
      resource="products"
      title="Products"
      columns={columns}
      pathPrefix="/products"
    />
  );
}

export function ProductFormPage() {
  const dp = useDataProvider();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [b, c] = await Promise.all([
          dp.getList("brands", {}),
          dp.getList("categories", {}),
        ]);
        if (!cancelled) {
          setBrands(b.data as unknown as Brand[]);
          setCategories(c.data as unknown as Category[]);
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dp]);

  return (
    <CrudForm<ProductRow>
      resource="products"
      title="Product"
      listPath="/products"
    >
      {() => (
        <>
          <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="brandId" label="Brand" rules={[{ required: true }]}>
            <Select
              options={brands.map((b) => ({ label: b.name, value: b.id }))}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
          <Form.Item name="categoryIds" label="Categories">
            <Select
              mode="multiple"
              allowClear
              options={categories.map((c) => ({ label: c.name, value: c.id }))}
            />
          </Form.Item>
        </>
      )}
    </CrudForm>
  );
}
