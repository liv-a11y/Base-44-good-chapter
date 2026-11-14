import { secrets } from "base44:runtime";

const API_VERSION = "2025-01";

const SEARCH = `query Suggest($q: String!, $first: Int!) {
  products(first: $first, query: $q, sortKey: RELEVANCE) {
    nodes {
      id
      title
      handle
      onlineStoreUrl
      featuredImage { url altText }
      priceRange { minVariantPrice { amount currencyCode } }
    }
  }
}`;

const cleanDomain = (value) =>
  String(value || "")
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");

const storeDomain = () => cleanDomain(secrets.get("SHOPIFY_STORE_DOMAIN"));

/** True once the store address and its Storefront API token are both saved. */
export const shopifyReady = () =>
  Boolean(storeDomain() && secrets.get("SHOPIFY_STOREFRONT_TOKEN"));

/** One search box query against the store, returned as plain card data. */
export async function searchProducts(query, first = 3) {
  const domain = storeDomain();
  const token = secrets.get("SHOPIFY_STOREFRONT_TOKEN");
  if (!domain || !token || !query) return [];

  const response = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query: SEARCH, variables: { q: query, first } }),
  });
  if (!response.ok) return [];

  const payload = await response.json();
  const nodes = payload?.data?.products?.nodes ?? [];

  const source = domain.replace(/\.myshopify\.com$/, "").replace(/^www\./, "");

  return nodes.map((node) => ({
    id: node.id,
    name: node.title,
    photo_url: node.featuredImage?.url || "",
    price: Number(node.priceRange?.minVariantPrice?.amount ?? 0),
    source,
    source_url: node.onlineStoreUrl || `https://${domain}/products/${node.handle}`,
  }));
}