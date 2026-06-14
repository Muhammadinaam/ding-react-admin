import {
  createMemoryResourceHandlers,
  type ResourceHandlers,
} from "ding-react-admin";
import type { Customer } from "../../api/memoryApi";
import { validationError } from "../../api/formValidation";
import type { PlaygroundHandlerContext } from "../playgroundHandlerContext";

export const CUSTOMER_RESOURCE = "customers" as const;

type CustomerRow = Customer & Record<string, unknown>;

function mapCustomer(data: Record<string, unknown>, id: number): Customer {
  const code = String(data.code ?? "").trim();
  if (!code) {
    throw validationError({ fields: { code: "Code is required" } });
  }
  return {
    id,
    code,
    name: String(data.name ?? ""),
    industry: String(data.industry ?? ""),
    website: String(data.website ?? ""),
    active: data.active !== false,
    contactName: String(data.contactName ?? ""),
    email: String(data.email ?? ""),
    phone: String(data.phone ?? ""),
    secondaryPhone: String(data.secondaryPhone ?? ""),
    billingStreet: String(data.billingStreet ?? ""),
    billingCity: String(data.billingCity ?? ""),
    billingCountry: String(data.billingCountry ?? ""),
    taxId: String(data.taxId ?? ""),
    paymentTerms: String(data.paymentTerms ?? "net_30"),
    creditLimit: Number(data.creditLimit ?? 0),
    currency: String(data.currency ?? "USD"),
    notes: String(data.notes ?? ""),
  };
}

export function createCustomerHandlers(
  ctx: PlaygroundHandlerContext,
): ResourceHandlers<CustomerRow> {
  const { api, nextId } = ctx;

  return createMemoryResourceHandlers<Customer>({
    getRows: () => api.customers,
    nextId,
    mapCreate: (data, id) => {
      const row = mapCustomer(data as Record<string, unknown>, Number(id));
      if (api.customers.some((c) => c.code === row.code)) {
        throw validationError({ fields: { code: "Code already exists" } });
      }
      return row;
    },
    applyUpdate: (current, patch) => {
      const merged = { ...current, ...patch };
      const row = mapCustomer(merged as Record<string, unknown>, current.id);
      if (api.customers.some((c) => c.code === row.code && c.id !== current.id)) {
        throw validationError({ fields: { code: "Code already exists" } });
      }
      return row;
    },
  }) as ResourceHandlers<CustomerRow>;
}
