import {
  adminPermissions,
  readOnlyPermissions,
} from "./playgroundPermissions";

export type PlaygroundRole = "admin" | "user";

export type MemoryUser = {
  id: string;
  username: string;
  password: string;
  role: PlaygroundRole;
};

export type Brand = {
  id: number;
  name: string;
  /** 1:1 — at most one product per brand; set when the product picks this brand. */
  productId: number | null;
};

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  sku: string;
  price: number;
  brandId: number;
  categoryIds: number[];
};

export type Invoice = {
  id: number;
  number: string;
  customer: string;
  issuedAt: string;
};

export type InvoiceLine = {
  id: number;
  invoiceId: number;
  productId: number | null;
  label: string;
  quantity: number;
  unitPrice: number;
};

export type Customer = {
  id: number;
  code: string;
  name: string;
  industry: string;
  website: string;
  active: boolean;
  contactName: string;
  email: string;
  phone: string;
  secondaryPhone: string;
  billingStreet: string;
  billingCity: string;
  billingCountry: string;
  taxId: string;
  paymentTerms: string;
  creditLimit: number;
  currency: string;
  notes: string;
};

export type PurchaseOrder = {
  id: number;
  number: string;
  supplierName: string;
  orderDate: string;
  expectedDelivery: string;
  shipTo: string;
  shippingMethod: string;
  warehouse: string;
  incoterms: string;
  currency: string;
  subtotal: number;
  taxRate: number;
  notes: string;
  status: string;
  approvedBy: string;
  approvedAt: string;
  internalNotes: string;
};

export type PublicUser = Omit<MemoryUser, "password"> & {
  permissions: string[];
};

/**
 * Stateless session: survives page refresh while in-memory rows reset.
 * (Avoids empty `sessions` Map after reload while sessionStorage still has a token.)
 */
function encodePlaygroundToken(userId: string): string {
  const json = JSON.stringify({ sub: userId, v: 2 });
  return `pg2.${btoa(json)}`;
}

function decodePlaygroundUserId(token: string | null): string | null {
  if (!token?.trim()) return null;
  if (!token.startsWith("pg2.")) return null;
  try {
    const payload = JSON.parse(atob(token.slice(4))) as { sub?: string };
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

const RESOURCES = [
  "products",
  "brands",
  "categories",
  "customers",
  "purchase-orders",
  "invoices",
  "invoice-lines",
] as const;

export type ResourceName = (typeof RESOURCES)[number];

let seq = 1;
const nextId = () => seq++;

function seedUsers(): MemoryUser[] {
  return [
    {
      id: "u-admin",
      username: "admin",
      password: "admin",
      role: "admin",
    },
    {
      id: "u-user",
      username: "user",
      password: "user",
      role: "user",
    },
  ];
}

function seedBrands(): Brand[] {
  const b1 = nextId();
  const b2 = nextId();
  return [
    { id: b1, name: "Acme Co", productId: null },
    { id: b2, name: "Globex", productId: null },
  ];
}

function seedCategories(): Category[] {
  return [
    { id: nextId(), name: "Electronics" },
    { id: nextId(), name: "Office" },
  ];
}

function seedProducts(
  brands: Brand[],
  categories: Category[],
): { products: Product[]; brands: Brand[] } {
  const b = [...brands];
  const p1: Product = {
    id: nextId(),
    name: "USB Cable",
    sku: "SKU-001",
    price: 9.5,
    brandId: b[0]!.id,
    categoryIds: [categories[0]!.id],
  };
  const p2: Product = {
    id: nextId(),
    name: "Notebook",
    sku: "SKU-002",
    price: 4.2,
    brandId: b[1]!.id,
    categoryIds: [categories[1]!.id, categories[0]!.id],
  };
  b[0] = { ...b[0]!, productId: p1.id };
  b[1] = { ...b[1]!, productId: p2.id };
  return { products: [p1, p2], brands: b };
}

function seedCustomers(): Customer[] {
  return [
    {
      id: nextId(),
      code: "CUST-001",
      name: "Northwind Traders",
      industry: "retail",
      website: "https://northwind.example",
      active: true,
      contactName: "Jane Cooper",
      email: "jane@northwind.example",
      phone: "+1 555 0100",
      secondaryPhone: "",
      billingStreet: "123 Market St",
      billingCity: "Seattle",
      billingCountry: "USA",
      taxId: "US-123456",
      paymentTerms: "net_30",
      creditLimit: 50_000,
      currency: "USD",
      notes: "Preferred customer — priority support.",
    },
    {
      id: nextId(),
      code: "CUST-002",
      name: "Contoso Ltd",
      industry: "technology",
      website: "https://contoso.example",
      active: true,
      contactName: "Alex Martin",
      email: "alex@contoso.example",
      phone: "+44 20 7946 0958",
      secondaryPhone: "",
      billingStreet: "45 High Street",
      billingCity: "London",
      billingCountry: "UK",
      taxId: "GB-987654",
      paymentTerms: "net_60",
      creditLimit: 25_000,
      currency: "GBP",
      notes: "",
    },
  ];
}

function seedPurchaseOrders(): PurchaseOrder[] {
  return [
    {
      id: nextId(),
      number: "PO-2001",
      supplierName: "Acme Supplies",
      orderDate: new Date().toISOString().slice(0, 10),
      expectedDelivery: "",
      shipTo: "Main warehouse",
      shippingMethod: "standard",
      warehouse: "main",
      incoterms: "FOB",
      currency: "USD",
      subtotal: 1_250,
      taxRate: 8.5,
      notes: "Restock USB cables and notebooks.",
      status: "approved",
      approvedBy: "admin",
      approvedAt: new Date().toISOString().slice(0, 10),
      internalNotes: "",
    },
  ];
}

function seedInvoices(): { invoices: Invoice[]; lines: InvoiceLine[] } {
  const inv: Invoice = {
    id: nextId(),
    number: "INV-1001",
    customer: "Northwind",
    issuedAt: new Date().toISOString().slice(0, 10),
  };
  const lines: InvoiceLine[] = [
    {
      id: nextId(),
      invoiceId: inv.id,
      productId: null,
      label: "Service fee",
      quantity: 1,
      unitPrice: 120,
    },
  ];
  return { invoices: [inv], lines };
}

export class PlaygroundMemoryApi {
  private users: MemoryUser[] = seedUsers();
  brands: Brand[];
  categories: Category[];
  products: Product[];
  customers: Customer[];
  purchaseOrders: PurchaseOrder[];
  invoices: Invoice[];
  invoiceLines: InvoiceLine[];

  constructor() {
    this.brands = seedBrands();
    this.categories = seedCategories();
    const { products, brands } = seedProducts(this.brands, this.categories);
    this.products = products;
    this.brands = brands;
    this.customers = seedCustomers();
    this.purchaseOrders = seedPurchaseOrders();
    const { invoices, lines } = seedInvoices();
    this.invoices = invoices;
    this.invoiceLines = lines;
  }

  login(username: string, password: string): { token: string; user: PublicUser } {
    const u = this.users.find(
      (x) =>
        x.username === username.trim() &&
        x.password === password,
    );
    if (!u) throw new Error("Invalid credentials");
    const token = encodePlaygroundToken(u.id);
    const { password: _p, ...pub } = u;
    const permissions =
      u.role === "admin" ? adminPermissions() : readOnlyPermissions();
    return { token, user: { ...pub, permissions } };
  }

  logoutToken(_token: string | null) {
    /* stateless token — nothing to revoke in memory */
  }

  private requireUser(token: string | null): PublicUser {
    const userId = decodePlaygroundUserId(token);
    if (!userId) throw new Error("Unauthorized");
    const u = this.users.find((x) => x.id === userId);
    if (!u) throw new Error("Unauthorized");
    const { password: _p, ...pub } = u;
    return pub;
  }

  getPermissions(token: string | null): string[] {
    try {
      const u = this.requireUser(token);
      return u.permissions;
    } catch {
      return [];
    }
  }

  /**
   * Keeps `brand.productId` in sync when a product selects a brand (1:1 back-reference).
   */
  syncBrandProductLink(product: Product, previousBrandId?: number) {
    if (previousBrandId !== undefined && previousBrandId !== product.brandId) {
      const prev = this.brands.find((b) => b.id === previousBrandId);
      if (prev?.productId === product.id) prev.productId = null;
    }
    const brand = this.brands.find((b) => b.id === product.brandId);
    if (!brand) return;
    if (brand.productId != null && brand.productId !== product.id) {
      const other = this.products.find((p) => p.id === brand.productId);
      if (other) {
        const free = this.brands.find(
          (b) => b.productId === null && b.id !== product.brandId,
        );
        if (free) {
          other.brandId = free.id;
          free.productId = other.id;
        } else {
          other.brandId = brand.id;
        }
      }
    }
    brand.productId = product.id;
  }
}
