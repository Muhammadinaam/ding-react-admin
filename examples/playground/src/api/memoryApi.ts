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
  image: string | null;
  specsPdf: string | null;
};

export type ProductPhoto = {
  id: number;
  productId: number;
  caption: string;
  image: string | null;
};

export type ProductAttachment = {
  id: number;
  productId: number;
  label: string;
  file: string | null;
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
  "product-photos",
  "product-attachments",
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
    image: "https://picsum.photos/seed/product-usb/400/300",
    specsPdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  };
  const p2: Product = {
    id: nextId(),
    name: "Notebook",
    sku: "SKU-002",
    price: 4.2,
    brandId: b[1]!.id,
    categoryIds: [categories[1]!.id, categories[0]!.id],
    image: "https://picsum.photos/seed/product-notebook/400/300",
    specsPdf: null,
  };
  b[0] = { ...b[0]!, productId: p1.id };
  b[1] = { ...b[1]!, productId: p2.id };
  return { products: [p1, p2], brands: b };
}

type CustomerSeed = Omit<Customer, "id">;

const CUSTOMER_SEEDS: CustomerSeed[] = [
  {
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
  {
    code: "CUST-003",
    name: "Fabrikam Inc",
    industry: "manufacturing",
    website: "https://fabrikam.example",
    active: true,
    contactName: "Maria Santos",
    email: "maria@fabrikam.example",
    phone: "+1 555 0103",
    secondaryPhone: "",
    billingStreet: "88 Industrial Blvd",
    billingCity: "Chicago",
    billingCountry: "USA",
    taxId: "US-234567",
    paymentTerms: "net_30",
    creditLimit: 40_000,
    currency: "USD",
    notes: "",
  },
  {
    code: "CUST-004",
    name: "Adventure Works",
    industry: "retail",
    website: "https://adventureworks.example",
    active: true,
    contactName: "David Mitchell",
    email: "david@adventureworks.example",
    phone: "+1 555 0104",
    secondaryPhone: "",
    billingStreet: "2100 Adventure Way",
    billingCity: "Portland",
    billingCountry: "USA",
    taxId: "US-345678",
    paymentTerms: "net_15",
    creditLimit: 30_000,
    currency: "USD",
    notes: "Seasonal ordering — Q4 peak.",
  },
  {
    code: "CUST-005",
    name: "Tailspin Toys",
    industry: "retail",
    website: "https://tailspin.example",
    active: true,
    contactName: "Emily Chen",
    email: "emily@tailspin.example",
    phone: "+1 555 0105",
    secondaryPhone: "+1 555 0106",
    billingStreet: "12 Playground Ave",
    billingCity: "Boston",
    billingCountry: "USA",
    taxId: "US-456789",
    paymentTerms: "net_30",
    creditLimit: 15_000,
    currency: "USD",
    notes: "",
  },
  {
    code: "CUST-006",
    name: "Wide World Importers",
    industry: "retail",
    website: "https://wideworld.example",
    active: true,
    contactName: "Oliver Grant",
    email: "oliver@wideworld.example",
    phone: "+61 2 9374 4000",
    secondaryPhone: "",
    billingStreet: "500 Harbour Rd",
    billingCity: "Sydney",
    billingCountry: "Australia",
    taxId: "AU-567890",
    paymentTerms: "net_60",
    creditLimit: 75_000,
    currency: "USD",
    notes: "International shipping account.",
  },
  {
    code: "CUST-007",
    name: "Blue Yonder Airlines",
    industry: "services",
    website: "https://blueyonder.example",
    active: true,
    contactName: "Sarah Klein",
    email: "sarah@blueyonder.example",
    phone: "+1 555 0107",
    secondaryPhone: "",
    billingStreet: "1 Terminal Dr",
    billingCity: "Denver",
    billingCountry: "USA",
    taxId: "US-678901",
    paymentTerms: "due_on_receipt",
    creditLimit: 100_000,
    currency: "USD",
    notes: "",
  },
  {
    code: "CUST-008",
    name: "Coho Winery",
    industry: "manufacturing",
    website: "https://cohowinery.example",
    active: true,
    contactName: "James Rivera",
    email: "james@cohowinery.example",
    phone: "+1 555 0108",
    secondaryPhone: "",
    billingStreet: "77 Vineyard Ln",
    billingCity: "Napa",
    billingCountry: "USA",
    taxId: "US-789012",
    paymentTerms: "net_30",
    creditLimit: 20_000,
    currency: "USD",
    notes: "Bulk glassware orders.",
  },
  {
    code: "CUST-009",
    name: "Lucerne Publishing",
    industry: "services",
    website: "https://lucerne.example",
    active: false,
    contactName: "Helen Brooks",
    email: "helen@lucerne.example",
    phone: "+44 20 7946 0109",
    secondaryPhone: "",
    billingStreet: "3 Book Row",
    billingCity: "Edinburgh",
    billingCountry: "UK",
    taxId: "GB-890123",
    paymentTerms: "net_30",
    creditLimit: 10_000,
    currency: "GBP",
    notes: "Account on hold — payment review.",
  },
  {
    code: "CUST-010",
    name: "Margie's Travel",
    industry: "services",
    website: "https://margies.example",
    active: true,
    contactName: "Margie Shipton",
    email: "margie@margies.example",
    phone: "+1 555 0110",
    secondaryPhone: "",
    billingStreet: "400 Explorer St",
    billingCity: "Miami",
    billingCountry: "USA",
    taxId: "US-901234",
    paymentTerms: "net_15",
    creditLimit: 12_000,
    currency: "USD",
    notes: "",
  },
  {
    code: "CUST-011",
    name: "The Phone Company",
    industry: "technology",
    website: "https://phoneco.example",
    active: true,
    contactName: "Ryan O'Connor",
    email: "ryan@phoneco.example",
    phone: "+353 1 555 0111",
    secondaryPhone: "",
    billingStreet: "22 Telecom Park",
    billingCity: "Dublin",
    billingCountry: "Ireland",
    taxId: "IE-012345",
    paymentTerms: "net_60",
    creditLimit: 60_000,
    currency: "EUR",
    notes: "",
  },
  {
    code: "CUST-012",
    name: "Graphic Design Institute",
    industry: "services",
    website: "https://gdi.example",
    active: true,
    contactName: "Lisa Park",
    email: "lisa@gdi.example",
    phone: "+1 555 0112",
    secondaryPhone: "",
    billingStreet: "55 Creative Blvd",
    billingCity: "Austin",
    billingCountry: "USA",
    taxId: "US-112345",
    paymentTerms: "net_30",
    creditLimit: 8_000,
    currency: "USD",
    notes: "Small recurring orders.",
  },
  {
    code: "CUST-013",
    name: "Consolidated Messenger",
    industry: "services",
    website: "https://consolidated.example",
    active: true,
    contactName: "Tom Berger",
    email: "tom@consolidated.example",
    phone: "+1 555 0113",
    secondaryPhone: "+1 555 0114",
    billingStreet: "900 Courier Way",
    billingCity: "Phoenix",
    billingCountry: "USA",
    taxId: "US-223456",
    paymentTerms: "net_30",
    creditLimit: 35_000,
    currency: "USD",
    notes: "",
  },
  {
    code: "CUST-014",
    name: "Alpine Ski House",
    industry: "retail",
    website: "https://alpineski.example",
    active: true,
    contactName: "Nina Weber",
    email: "nina@alpineski.example",
    phone: "+41 44 555 0115",
    secondaryPhone: "",
    billingStreet: "8 Mountain Pass",
    billingCity: "Zurich",
    billingCountry: "Switzerland",
    taxId: "CH-334567",
    paymentTerms: "net_30",
    creditLimit: 18_000,
    currency: "EUR",
    notes: "Winter season prep orders.",
  },
  {
    code: "CUST-015",
    name: "Southridge Video",
    industry: "retail",
    website: "https://southridge.example",
    active: true,
    contactName: "Chris Dalton",
    email: "chris@southridge.example",
    phone: "+1 555 0116",
    secondaryPhone: "",
    billingStreet: "140 Cinema Plaza",
    billingCity: "Los Angeles",
    billingCountry: "USA",
    taxId: "US-445678",
    paymentTerms: "net_15",
    creditLimit: 22_000,
    currency: "USD",
    notes: "",
  },
  {
    code: "CUST-016",
    name: "Humongous Insurance",
    industry: "services",
    website: "https://humongous.example",
    active: true,
    contactName: "Patricia Wells",
    email: "patricia@humongous.example",
    phone: "+1 555 0117",
    secondaryPhone: "",
    billingStreet: "1 Policy Center",
    billingCity: "Hartford",
    billingCountry: "USA",
    taxId: "US-556789",
    paymentTerms: "net_60",
    creditLimit: 90_000,
    currency: "USD",
    notes: "Enterprise contract.",
  },
  {
    code: "CUST-017",
    name: "Litware Inc",
    industry: "technology",
    website: "https://litware.example",
    active: true,
    contactName: "Kevin Shaw",
    email: "kevin@litware.example",
    phone: "+1 555 0118",
    secondaryPhone: "",
    billingStreet: "600 Software Dr",
    billingCity: "San Jose",
    billingCountry: "USA",
    taxId: "US-667890",
    paymentTerms: "net_30",
    creditLimit: 45_000,
    currency: "USD",
    notes: "",
  },
  {
    code: "CUST-018",
    name: "Proseware Inc",
    industry: "technology",
    website: "https://proseware.example",
    active: true,
    contactName: "Amanda Liu",
    email: "amanda@proseware.example",
    phone: "+1 555 0119",
    secondaryPhone: "",
    billingStreet: "75 Writer's Row",
    billingCity: "Redmond",
    billingCountry: "USA",
    taxId: "US-778901",
    paymentTerms: "net_30",
    creditLimit: 28_000,
    currency: "USD",
    notes: "Office supplies standing order.",
  },
  {
    code: "CUST-019",
    name: "Trey Research",
    industry: "technology",
    website: "https://treyresearch.example",
    active: true,
    contactName: "Brian Holt",
    email: "brian@treyresearch.example",
    phone: "+1 555 0120",
    secondaryPhone: "",
    billingStreet: "200 Lab Circle",
    billingCity: "Cambridge",
    billingCountry: "USA",
    taxId: "US-889012",
    paymentTerms: "net_60",
    creditLimit: 55_000,
    currency: "USD",
    notes: "",
  },
  {
    code: "CUST-020",
    name: "Wingtip Toys",
    industry: "retail",
    website: "https://wingtip.example",
    active: true,
    contactName: "Sophie Turner",
    email: "sophie@wingtip.example",
    phone: "+1 555 0121",
    secondaryPhone: "",
    billingStreet: "33 Toy Lane",
    billingCity: "Minneapolis",
    billingCountry: "USA",
    taxId: "US-990123",
    paymentTerms: "net_30",
    creditLimit: 16_000,
    currency: "USD",
    notes: "Holiday catalog buyer.",
  },
  {
    code: "CUST-021",
    name: "Fourth Coffee",
    industry: "retail",
    website: "https://fourthcoffee.example",
    active: true,
    contactName: "Rachel Kim",
    email: "rachel@fourthcoffee.example",
    phone: "+1 555 0122",
    secondaryPhone: "",
    billingStreet: "18 Roast St",
    billingCity: "Seattle",
    billingCountry: "USA",
    taxId: "US-101234",
    paymentTerms: "due_on_receipt",
    creditLimit: 5_000,
    currency: "USD",
    notes: "",
  },
  {
    code: "CUST-022",
    name: "City Power & Light",
    industry: "services",
    website: "https://citypower.example",
    active: true,
    contactName: "George Nash",
    email: "george@citypower.example",
    phone: "+1 555 0123",
    secondaryPhone: "",
    billingStreet: "500 Grid Ave",
    billingCity: "Detroit",
    billingCountry: "USA",
    taxId: "US-212345",
    paymentTerms: "net_60",
    creditLimit: 80_000,
    currency: "USD",
    notes: "Municipal procurement.",
  },
  {
    code: "CUST-023",
    name: "School of Fine Art",
    industry: "services",
    website: "https://fineart.example",
    active: true,
    contactName: "Claire Dubois",
    email: "claire@fineart.example",
    phone: "+33 1 55 55 0124",
    secondaryPhone: "",
    billingStreet: "12 Atelier Rue",
    billingCity: "Paris",
    billingCountry: "France",
    taxId: "FR-323456",
    paymentTerms: "net_30",
    creditLimit: 9_000,
    currency: "EUR",
    notes: "",
  },
  {
    code: "CUST-024",
    name: "VanArsdel Ltd",
    industry: "manufacturing",
    website: "https://vanarsdel.example",
    active: true,
    contactName: "Peter VanArsdel",
    email: "peter@vanarsdel.example",
    phone: "+31 20 555 0125",
    secondaryPhone: "",
    billingStreet: "44 Factory Rd",
    billingCity: "Amsterdam",
    billingCountry: "Netherlands",
    taxId: "NL-434567",
    paymentTerms: "net_30",
    creditLimit: 42_000,
    currency: "EUR",
    notes: "",
  },
  {
    code: "CUST-025",
    name: "Barkingen Foods",
    industry: "manufacturing",
    website: "https://barkingen.example",
    active: true,
    contactName: "Hans Mueller",
    email: "hans@barkingen.example",
    phone: "+49 30 555 0126",
    secondaryPhone: "",
    billingStreet: "90 Food Park",
    billingCity: "Berlin",
    billingCountry: "Germany",
    taxId: "DE-545678",
    paymentTerms: "net_30",
    creditLimit: 33_000,
    currency: "EUR",
    notes: "Organic packaging requirements.",
  },
  {
    code: "CUST-026",
    name: "Baldwin Museum of Science",
    industry: "services",
    website: "https://baldwinmuseum.example",
    active: true,
    contactName: "Dr. Elaine Frost",
    email: "elaine@baldwinmuseum.example",
    phone: "+1 555 0127",
    secondaryPhone: "",
    billingStreet: "1 Museum Way",
    billingCity: "Philadelphia",
    billingCountry: "USA",
    taxId: "US-656789",
    paymentTerms: "net_60",
    creditLimit: 14_000,
    currency: "USD",
    notes: "",
  },
  {
    code: "CUST-027",
    name: "Bellows College",
    industry: "services",
    website: "https://bellows.example",
    active: true,
    contactName: "Dean Morrison",
    email: "dean@bellows.example",
    phone: "+1 555 0128",
    secondaryPhone: "",
    billingStreet: "300 Campus Dr",
    billingCity: "Madison",
    billingCountry: "USA",
    taxId: "US-767890",
    paymentTerms: "net_30",
    creditLimit: 25_000,
    currency: "USD",
    notes: "Back-to-school bulk orders.",
  },
  {
    code: "CUST-028",
    name: "Best For You Organics",
    industry: "retail",
    website: "https://bestforyou.example",
    active: true,
    contactName: "Anita Green",
    email: "anita@bestforyou.example",
    phone: "+1 555 0129",
    secondaryPhone: "",
    billingStreet: "60 Green Market",
    billingCity: "Portland",
    billingCountry: "USA",
    taxId: "US-878901",
    paymentTerms: "net_15",
    creditLimit: 11_000,
    currency: "USD",
    notes: "",
  },
  {
    code: "CUST-029",
    name: "Campers World",
    industry: "retail",
    website: "https://campersworld.example",
    active: true,
    contactName: "Mike Larson",
    email: "mike@campersworld.example",
    phone: "+1 555 0130",
    secondaryPhone: "",
    billingStreet: "250 Trailhead Rd",
    billingCity: "Boise",
    billingCountry: "USA",
    taxId: "US-989012",
    paymentTerms: "net_30",
    creditLimit: 19_000,
    currency: "USD",
    notes: "Outdoor gear distributor.",
  },
  {
    code: "CUST-030",
    name: "Canine Comforts",
    industry: "retail",
    website: "https://caninecomforts.example",
    active: false,
    contactName: "Jessica Holt",
    email: "jessica@caninecomforts.example",
    phone: "+1 555 0131",
    secondaryPhone: "",
    billingStreet: "9 Pet Plaza",
    billingCity: "Nashville",
    billingCountry: "USA",
    taxId: "US-090123",
    paymentTerms: "net_30",
    creditLimit: 7_000,
    currency: "USD",
    notes: "Inactive — reopening Q3.",
  },
];

function seedCustomers(): Customer[] {
  return CUSTOMER_SEEDS.map((seed) => ({
    ...seed,
    id: nextId(),
  }));
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

function seedProductMedia(products: Product[]): {
  photos: ProductPhoto[];
  attachments: ProductAttachment[];
} {
  const usb = products[0]!;
  const photos: ProductPhoto[] = [
    {
      id: nextId(),
      productId: usb.id,
      caption: "Packaging",
      image: "https://picsum.photos/seed/product-usb-pack/400/300",
    },
    {
      id: nextId(),
      productId: usb.id,
      caption: "Connector close-up",
      image: "https://picsum.photos/seed/product-usb-port/400/300",
    },
  ];
  const attachments: ProductAttachment[] = [
    {
      id: nextId(),
      productId: usb.id,
      label: "Safety sheet",
      file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];
  return { photos, attachments };
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
  productPhotos: ProductPhoto[];
  productAttachments: ProductAttachment[];

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
    const { photos, attachments } = seedProductMedia(this.products);
    this.productPhotos = photos;
    this.productAttachments = attachments;
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
    const permissions =
      u.role === "admin" ? adminPermissions() : readOnlyPermissions();
    return { ...pub, permissions };
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
