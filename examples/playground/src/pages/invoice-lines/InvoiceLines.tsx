import {
  FilterBar,
  NumberColumn,
  NumberField,
  ReferenceColumn,
  ReferenceField,
  ReferenceFilter,
  ResourceForm,
  ResourceList,
  TextColumn,
  TextField,
} from "ding-react-admin";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { InvoiceLine } from "../../api/memoryApi";
import { INVOICE_LINE_RESOURCE } from "./invoiceLineData";

type LineRow = InvoiceLine & Record<string, unknown>;

export function InvoiceLineListPage() {
  const [params] = useSearchParams();
  const invoiceIdRaw = params.get("invoiceId");
  const staticFilter = useMemo(() => {
    if (!invoiceIdRaw) return undefined;
    const n = Number(invoiceIdRaw);
    return Number.isFinite(n) ? { invoiceId: n } : undefined;
  }, [invoiceIdRaw]);

  const title =
    staticFilter?.invoiceId != null
      ? `Invoice lines · invoice ${String(staticFilter.invoiceId)}`
      : "Invoice lines";

  const newPath =
    staticFilter?.invoiceId != null
      ? `/invoice-lines/new?invoiceId=${String(staticFilter.invoiceId)}`
      : undefined;

  const formFields = (
    <>
      <ReferenceField
        source="invoiceId"
        label="Invoice"
        reference="invoices"
        optionLabel={(r) => `${String(r.number)} (#${String(r.id)})`}
        required
        disabled={staticFilter?.invoiceId != null}
      />
      <ReferenceField
        source="productId"
        label="Product"
        reference="products"
        optionLabel="name"
        allowClear
      />
      <TextField source="label" label="Label" required />
      <NumberField source="quantity" label="Quantity" required min={0} step={1} />
      <NumberField source="unitPrice" label="Unit price" required min={0} step={0.01} />
    </>
  );

  return (
    <ResourceList
      resource={INVOICE_LINE_RESOURCE}
      title={title}
      pathPrefix="/invoice-lines"
      newPath={newPath}
      staticFilter={staticFilter}
      formChildren={formFields}
      editMode="both"
    >
      {!staticFilter ? (
        <FilterBar>
          <ReferenceFilter
            source="invoiceId"
            label="Invoice"
            reference="invoices"
            optionLabel={(r) => `${String(r.number)} (#${String(r.id)})`}
          />
        </FilterBar>
      ) : null}
      <ReferenceColumn
        source="invoiceId"
        label="Invoice"
        reference="invoices"
        optionLabel={(r) => `${String(r.number)} (#${String(r.id)})`}
      />
      <ReferenceColumn
        source="productId"
        label="Product"
        reference="products"
        optionLabel="name"
      />
      <TextColumn source="label" label="Label" />
      <NumberColumn source="quantity" label="Qty" />
      <NumberColumn source="unitPrice" label="Unit" />
    </ResourceList>
  );
}

export function InvoiceLineFormPage() {
  const [params] = useSearchParams();
  const invoiceIdFromQuery = params.get("invoiceId");
  const listPath =
    invoiceIdFromQuery != null
      ? `/invoice-lines?invoiceId=${invoiceIdFromQuery}`
      : "/invoice-lines";

  const defaultValues = useMemo(() => {
    if (!invoiceIdFromQuery) return undefined;
    const n = Number(invoiceIdFromQuery);
    return Number.isFinite(n) ? { invoiceId: n } : undefined;
  }, [invoiceIdFromQuery]);

  return (
    <ResourceForm<LineRow>
      resource={INVOICE_LINE_RESOURCE}
      title="Invoice line"
      listPath={listPath}
      defaultValues={defaultValues}
    >
      <ReferenceField
        source="invoiceId"
        label="Invoice"
        reference="invoices"
        optionLabel={(r) => `${String(r.number)} (#${String(r.id)})`}
        required
        disabled={invoiceIdFromQuery != null}
      />
      <ReferenceField
        source="productId"
        label="Product"
        reference="products"
        optionLabel="name"
        allowClear
      />
      <TextField source="label" label="Label" required />
      <NumberField source="quantity" label="Quantity" required min={0} step={1} />
      <NumberField source="unitPrice" label="Unit price" required min={0} step={0.01} />
    </ResourceForm>
  );
}
