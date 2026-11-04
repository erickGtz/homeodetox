export type Money = {
  amount: number;
  currencyCode: "MXN";
};

export type CommerceVariant = {
  id: string;
  title: string;
  sku?: string;
  price: Money;
  available: boolean;
};

export type CommerceProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: string[];
  variants: CommerceVariant[];
};

export type CartLine = {
  id: string;
  variantId: string;
  title: string;
  quantity: number;
  unitPrice: Money;
  total: Money;
};

export type Cart = {
  id: string;
  lines: CartLine[];
  subtotal: Money;
  total: Money;
};

export type Checkout = {
  id: string;
  cartId: string;
  status: "pending" | "completed" | "failed";
  checkoutUrl?: string;
};

export type CommerceProviderName = "none" | "medusa" | "shopify";
