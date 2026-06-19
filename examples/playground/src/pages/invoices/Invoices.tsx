import {
  DateColumn,
  DateField,
  InlineFormSet,
  NumberField,
  ReferenceField,
  ResourceForm,
  ResourceList,
  TextColumn,
  TextField,
} from "ding-react-admin";
import { useFormContext } from "react-hook-form";
import type { Invoice } from "../../api/memoryApi";
import { INVOICE_RESOURCE } from "./invoiceData";

type InvoiceRow = Invoice & {
  lines?: Array<{
    id?: number;
    productId?: number | null;
    label?: string;
    quantity?: number;
    unitPrice?: number;
  }>;
} & Record<string, unknown>;

export function InvoiceListPage() {
  return (
    <ResourceList
      resource={INVOICE_RESOURCE}
      title="Invoices"
      pathPrefix="/invoices"
    >
      <TextColumn source="number" label="Number" />
      <TextColumn source="customer" label="Customer" />
      <DateColumn source="issuedAt" label="Issued" />
    </ResourceList>
  );
}

/** Inline rows need form context for dependent-field updates (product → unit price). */
function InvoiceLinesInline() {
  const { setValue } = useFormContext();

  return (
    <InlineFormSet
      field="lines"
      label="Invoice lines"
      columns={[
        {
          source: "productId",
          label: "Product",
          minWidth: 220,
          cell: (cell) => (
            <ReferenceField
              source="productId"
              name={cell.name}
              hideLabel
              reference="products"
              optionLabel="name"
              allowClear
              inputStyle={{ minWidth: 200 }}
              onValueChange={(value, option, { name }) => {
                const unitPriceName = name.replace(/\.productId$/, ".unitPrice");
                if (value == null) {
                  setValue(unitPriceName, undefined, { shouldDirty: true });
                  return;
                }
                const price = option?.record?.price;
                if (typeof price === "number") {
                  setValue(unitPriceName, price, { shouldDirty: true });
                }
              }}
            />
          ),
        },
        {
          source: "label",
          label: "Label",
          minWidth: 180,
          cell: (cell) => (
            <TextField
              source="label"
              name={cell.name}
              hideLabel
              required
            />
          ),
        },
        {
          source: "quantity",
          label: "Quantity",
          width: 120,
          minWidth: 100,
          cell: (cell) => (
            <NumberField
              source="quantity"
              name={cell.name}
              hideLabel
              required
              min={0}
              step={1}
            />
          ),
        },
        {
          source: "unitPrice",
          label: "Unit price",
          width: 140,
          minWidth: 120,
          cell: (cell) => (
            <NumberField
              source="unitPrice"
              name={cell.name}
              hideLabel
              required
              min={0}
              step={0.01}
            />
          ),
        },
      ]}
    />
  );
}

export function InvoiceFormPage() {
  return (
    <ResourceForm<InvoiceRow>
      resource={INVOICE_RESOURCE}
      title="Invoice"
      listPath="/invoices"
    >
      <TextField source="number" label="Number" required />
      <TextField source="customer" label="Customer" required />
      <DateField source="issuedAt" label="Issued" required />
      <InvoiceLinesInline />
    </ResourceForm>
  );
}
