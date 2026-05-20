import {
  ResourceForm,
  ResourceList,
  TextColumn,
  TextField,
} from "ding-react-admin";
import type { Category } from "../../api/memoryApi";
import { CATEGORY_RESOURCE } from "./categoryData";

type CategoryRow = Category & Record<string, unknown>;

export function CategoryListPage() {
  return (
    <ResourceList
      resource={CATEGORY_RESOURCE}
      title="Categories"
      pathPrefix="/categories"
    >
      <TextColumn source="name" label="Name" />
    </ResourceList>
  );
}

export function CategoryFormPage() {
  return (
    <ResourceForm<CategoryRow>
      resource={CATEGORY_RESOURCE}
      title="Category"
      listPath="/categories"
    >
      <TextField source="name" label="Name" required />
    </ResourceForm>
  );
}
