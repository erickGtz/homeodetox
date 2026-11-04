import type { CommerceProviderName } from "./types";

export type CommerceProvider = {
  name: CommerceProviderName;
  enabled: boolean;
};

export function getCommerceProvider(): CommerceProvider {
  const name = (process.env.COMMERCE_PROVIDER ?? "none") as CommerceProviderName;
  const enabled = process.env.NEXT_PUBLIC_COMMERCE_ENABLED === "true";

  return { name, enabled };
}
