import {
  FileField,
  FilterBar,
  ImageColumn,
  ImageField,
  InlineFormSet,
  NumberColumn,
  NumberField,
  ReferenceColumn,
  ReferenceField,
  ReferenceFilter,
  ReferenceManyColumn,
  ReferenceManyField,
  ReferenceManyFilter,
  ResourceForm,
  ResourceList,
  TextColumn,
  TextField,
  TextFilter,
} from "ding-react-admin";
import { Button } from "antd";
import type { Product } from "../../api/memoryApi";
import { PRODUCT_RESOURCE, PRODUCT_PERMS } from "./productData";

type ProductRow = Product & {
  photos?: Array<{
    id?: number;
    caption?: string;
    image?: string | null;
  }>;
  attachments?: Array<{
    id?: number;
    label?: string;
    file?: string | null;
  }>;
} & Record<string, unknown>;

function ProductPhotosInline() {
  return (
    <InlineFormSet
      field="photos"
      label="Gallery photos"
      columns={[
        {
          source: "caption",
          label: "Caption",
          minWidth: 140,
          cell: (cell) => (
            <TextField source="caption" name={cell.name} hideLabel required />
          ),
        },
        {
          source: "image",
          label: "Photo",
          minWidth: 220,
          cell: (cell) => (
            <ImageField
              source="image"
              name={cell.name}
              hideLabel
              clearable
              previewWidth={100}
            />
          ),
        },
      ]}
    />
  );
}

function ProductAttachmentsInline() {
  return (
    <InlineFormSet
      field="attachments"
      label="Documents"
      columns={[
        {
          source: "label",
          label: "Label",
          minWidth: 140,
          cell: (cell) => (
            <TextField source="label" name={cell.name} hideLabel required />
          ),
        },
        {
          source: "file",
          label: "File",
          minWidth: 220,
          cell: (cell) => (
            <FileField
              source="file"
              name={cell.name}
              hideLabel
              clearable
              accept=".pdf,.doc,.docx,application/pdf"
            />
          ),
        },
      ]}
    />
  );
}

const productFormFields = (
  <>
    <TextField source="sku" label="SKU" required />
    <TextField source="name" label="Name" required />
    <NumberField source="price" label="Price" required min={0} step={0.01} />
    <ReferenceField
      source="brandId"
      label="Brand"
      reference="brands"
      optionLabel="name"
      required
    />
    <ReferenceManyField
      source="categoryIds"
      label="Categories"
      reference="categories"
      optionLabel="name"
    />
    <ImageField source="image" label="Product image" clearable />
    <FileField
      source="specsPdf"
      label="Specs (PDF)"
      clearable
      accept=".pdf,application/pdf"
    />
    <ProductPhotosInline />
    <ProductAttachmentsInline />
  </>
);

export function ProductListPage() {
  return (
    <ResourceList
      resource={PRODUCT_RESOURCE}
      title="Products"
      pathPrefix="/products"
      editMode="both"
      permissions={{
        add: PRODUCT_PERMS.add,
        change: PRODUCT_PERMS.change,
        delete: PRODUCT_PERMS.delete,
      }}
      formChildren={productFormFields}
      actions={{ delete: false }}
      bulkActions={[
        {
          key: "export",
          label: "Export selected",
          execute: (ids) => {
            window.alert(`Export ${ids.length} product(s) (demo)`);
          },
        },
      ]}
      headerExtra={
        <Button onClick={() => window.alert("Export products (demo)")}>
          Export
        </Button>
      }
      rowActions={(row) => (
        <Button
          type="link"
          size="small"
          style={{ padding: 0 }}
          onClick={() => window.alert(`Duplicate ${row.name} (demo)`)}
        >
          Duplicate
        </Button>
      )}
    >
      <FilterBar>
        <TextFilter source="name" label="Name" />
        <ReferenceFilter
          source="brandId"
          label="Brand"
          reference="brands"
          optionLabel="name"
          multiple
        />
        <ReferenceManyFilter
          source="categoryIds"
          label="Categories"
          reference="categories"
          optionLabel="name"
        />
      </FilterBar>
      <ImageColumn source="image" label="Image" />
      <TextColumn source="sku" label="SKU" />
      <TextColumn source="name" label="Name" />
      <NumberColumn source="price" label="Price" />
      <ReferenceColumn
        source="brandId"
        label="Brand"
        reference="brands"
        optionLabel="name"
      />
      <ReferenceManyColumn
        source="categoryIds"
        label="Categories"
        reference="categories"
        optionLabel="name"
      />
    </ResourceList>
  );
}

export function ProductFormPage() {
  return (
    <ResourceForm<ProductRow>
      resource={PRODUCT_RESOURCE}
      title="Product"
      listPath="/products"
      permissions={{
        add: PRODUCT_PERMS.add,
        change: PRODUCT_PERMS.change,
      }}
    >
      {productFormFields}
    </ResourceForm>
  );
}
