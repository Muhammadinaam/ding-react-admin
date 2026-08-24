import { AppHub } from "ding-react-admin";
import { PLAYGROUND_HUB_APPS } from "../navigation";

export function AppHubPage() {
  return <AppHub apps={PLAYGROUND_HUB_APPS} />;
}
