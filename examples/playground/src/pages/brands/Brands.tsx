import {
  ResourceForm,
  ResourceList,
  TextColumn,
  TextField,
} from "ding-react-admin";
import type { Brand } from "../../api/memoryApi";
import { BRAND_RESOURCE } from "./brandData";

type BrandRow = Brand & Record<string, unknown>;

export function BrandListPage() {
  return (
    <ResourceList
      resource={BRAND_RESOURCE}
      title="Brands"
      pathPrefix="/brands"
    >
      <TextColumn source="name" label="Name" />
      <TextColumn source="productId" label="Linked product id" sortable={false} />
    </ResourceList>
  );
}

export function BrandFormPage() {
  return (
    <ResourceForm<BrandRow>
      resource={BRAND_RESOURCE}
      title="Brand"
      listPath="/brands"
    >
      <TextField source="name" label="Name" required />
    </ResourceForm>
  );
}
