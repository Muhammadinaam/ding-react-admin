import {
  CustomColumn,
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
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import type { Invoice } from "../../api/memoryApi";
import { INVOICE_RESOURCE } from "./invoiceData";
import { INVOICE_LINE_RESOURCE } from "../invoice-lines/invoiceLineData";

type InvoiceRow = Invoice & Record<string, unknown>;

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
      <CustomColumn
        source="__lines"
        label="Lines"
        render={(row) => (
          <Link to={`/invoice-lines?invoiceId=${String(row.id)}`}>
            View lines
          </Link>
        )}
      />
    </ResourceList>
  );
}

/** Inline rows need form context for dependent-field updates (product → unit price). */
function InvoiceLinesInline() {
  const { setValue } = useFormContext();

  return (
    <InlineFormSet
      resource={INVOICE_LINE_RESOURCE}
      foreignKey="invoiceId"
      label="Invoice lines"
    >
      <ReferenceField
        source="productId"
        label="Product"
        reference="products"
        optionLabel="name"
        allowClear
        minWidth={220}
        inputStyle={{ minWidth: 200 }}
        onValueChange={(value, option, { name }) => {
          if (!name) return;
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
      <TextField source="label" label="Label" required minWidth={180} />
      <NumberField
        source="quantity"
        label="Quantity"
        required
        min={0}
        step={1}
        minWidth={100}
        width={120}
      />
      <NumberField
        source="unitPrice"
        label="Unit price"
        required
        min={0}
        step={0.01}
        minWidth={120}
        width={140}
      />
    </InlineFormSet>
  );
}

export function InvoiceFormPage() {
  return (
    <ResourceForm<InvoiceRow>
      resource={INVOICE_RESOURCE}
      title="Invoice"
      listPath="/invoices"
      inlines={[
        { resource: INVOICE_LINE_RESOURCE, foreignKey: "invoiceId" },
      ]}
    >
      <TextField source="number" label="Number" required />
      <TextField source="customer" label="Customer" required />
      <DateField source="issuedAt" label="Issued" required />
      <InvoiceLinesInline />
    </ResourceForm>
  );
}
