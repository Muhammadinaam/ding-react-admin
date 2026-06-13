import {
  BooleanColumn,
  BooleanField,
  FilterBar,
  FormTab,
  FormTabs,
  NumberField,
  ResourceForm,
  ResourceList,
  SelectField,
  TextColumn,
  TextField,
  TextFilter,
} from "ding-react-admin";
import type { Customer } from "../../api/memoryApi";
import { CUSTOMER_RESOURCE } from "./customerData";

type CustomerRow = Customer & Record<string, unknown>;

const PAYMENT_TERM_CHOICES = [
  { value: "net_15", label: "Net 15" },
  { value: "net_30", label: "Net 30" },
  { value: "net_60", label: "Net 60" },
  { value: "due_on_receipt", label: "Due on receipt" },
];

const CURRENCY_CHOICES = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
];

const INDUSTRY_CHOICES = [
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "technology", label: "Technology" },
  { value: "services", label: "Services" },
];

function CustomerFormFields() {
  return (
    <FormTabs>
      <FormTab key="company" label="Company">
        <TextField source="code" label="Code" required />
        <TextField source="name" label="Name" required />
        <SelectField
          source="industry"
          label="Industry"
          choices={INDUSTRY_CHOICES}
          allowClear
        />
        <TextField source="website" label="Website" placeholder="https://" />
        <BooleanField source="active" label="Active" />
      </FormTab>
      <FormTab key="contact" label="Contact">
        <TextField source="contactName" label="Contact name" />
        <TextField source="email" label="Email" />
        <TextField source="phone" label="Phone" />
        <TextField source="secondaryPhone" label="Secondary phone" />
      </FormTab>
      <FormTab key="billing" label="Billing">
        <TextField source="billingStreet" label="Street" />
        <TextField source="billingCity" label="City" />
        <TextField source="billingCountry" label="Country" />
        <TextField source="taxId" label="Tax ID" />
        <SelectField
          source="paymentTerms"
          label="Payment terms"
          choices={PAYMENT_TERM_CHOICES}
        />
      </FormTab>
      <FormTab key="account" label="Account">
        <NumberField
          source="creditLimit"
          label="Credit limit"
          min={0}
          step={100}
        />
        <SelectField
          source="currency"
          label="Currency"
          choices={CURRENCY_CHOICES}
        />
        <TextField source="notes" label="Notes" />
      </FormTab>
    </FormTabs>
  );
}

export function CustomerListPage() {
  return (
    <ResourceList
      resource={CUSTOMER_RESOURCE}
      title="Customers"
      pathPrefix="/customers"
      editMode="both"
      formChildren={<CustomerFormFields />}
    >
      <FilterBar>
        <TextFilter source="name" label="Name" />
        <TextFilter source="code" label="Code" />
      </FilterBar>
      <TextColumn source="code" label="Code" />
      <TextColumn source="name" label="Name" />
      <TextColumn source="email" label="Email" />
      <TextColumn source="billingCountry" label="Country" />
      <BooleanColumn source="active" label="Active" />
    </ResourceList>
  );
}

export function CustomerFormPage() {
  return (
    <ResourceForm<CustomerRow>
      resource={CUSTOMER_RESOURCE}
      title="Customer"
      listPath="/customers"
    >
      <CustomerFormFields />
    </ResourceForm>
  );
}
