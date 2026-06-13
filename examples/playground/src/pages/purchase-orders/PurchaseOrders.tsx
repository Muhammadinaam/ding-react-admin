import {
  DateField,
  FormStep,
  FormSteps,
  NumberColumn,
  NumberField,
  ResourceForm,
  ResourceList,
  SelectField,
  TextColumn,
  TextField,
} from "ding-react-admin";
import type { PurchaseOrder } from "../../api/memoryApi";
import { PURCHASE_ORDER_RESOURCE } from "./purchaseOrderData";

type PurchaseOrderRow = PurchaseOrder & Record<string, unknown>;

const STATUS_CHOICES = [
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "approved", label: "Approved" },
  { value: "cancelled", label: "Cancelled" },
];

const SHIPPING_METHOD_CHOICES = [
  { value: "standard", label: "Standard" },
  { value: "express", label: "Express" },
  { value: "freight", label: "Freight" },
];

const INCOTERMS_CHOICES = [
  { value: "EXW", label: "EXW" },
  { value: "FOB", label: "FOB" },
  { value: "CIF", label: "CIF" },
  { value: "DDP", label: "DDP" },
];

const CURRENCY_CHOICES = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
];

const WAREHOUSE_CHOICES = [
  { value: "main", label: "Main warehouse" },
  { value: "east", label: "East depot" },
  { value: "west", label: "West depot" },
];

function PurchaseOrderFormFields() {
  return (
    <FormSteps>
      <FormStep title="Vendor">
        <TextField source="number" label="PO number" required />
        <TextField source="supplierName" label="Supplier" required />
        <DateField source="orderDate" label="Order date" required />
        <DateField source="expectedDelivery" label="Expected delivery" />
      </FormStep>
      <FormStep title="Delivery">
        <TextField source="shipTo" label="Ship to" />
        <SelectField
          source="shippingMethod"
          label="Shipping method"
          choices={SHIPPING_METHOD_CHOICES}
        />
        <SelectField
          source="warehouse"
          label="Warehouse"
          choices={WAREHOUSE_CHOICES}
          allowClear
        />
        <SelectField
          source="incoterms"
          label="Incoterms"
          choices={INCOTERMS_CHOICES}
        />
      </FormStep>
      <FormStep title="Commercial">
        <SelectField
          source="currency"
          label="Currency"
          choices={CURRENCY_CHOICES}
        />
        <NumberField
          source="subtotal"
          label="Subtotal"
          min={0}
          step={0.01}
        />
        <NumberField
          source="taxRate"
          label="Tax rate (%)"
          min={0}
          max={100}
          step={0.1}
        />
        <TextField source="notes" label="Notes" />
      </FormStep>
      <FormStep title="Approval">
        <SelectField
          source="status"
          label="Status"
          choices={STATUS_CHOICES}
        />
        <TextField source="approvedBy" label="Approved by" />
        <DateField source="approvedAt" label="Approved at" />
        <TextField source="internalNotes" label="Internal notes" />
      </FormStep>
    </FormSteps>
  );
}

export function PurchaseOrderListPage() {
  return (
    <ResourceList
      resource={PURCHASE_ORDER_RESOURCE}
      title="Purchase orders"
      pathPrefix="/purchase-orders"
      editMode="both"
      formChildren={<PurchaseOrderFormFields />}
    >
      <TextColumn source="number" label="PO number" />
      <TextColumn source="supplierName" label="Supplier" />
      <TextColumn source="orderDate" label="Order date" />
      <TextColumn source="status" label="Status" />
      <NumberColumn source="subtotal" label="Subtotal" />
    </ResourceList>
  );
}

export function PurchaseOrderFormPage() {
  return (
    <ResourceForm<PurchaseOrderRow>
      resource={PURCHASE_ORDER_RESOURCE}
      title="Purchase order"
      listPath="/purchase-orders"
    >
      <PurchaseOrderFormFields />
    </ResourceForm>
  );
}
