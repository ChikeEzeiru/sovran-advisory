// Keep this list aligned with the markets Sovran can credibly support.
// The contact form and its server-side validation both use this source.
export const SOVRAN_MARKETS = [
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Cameroon",
  "Côte d’Ivoire",
  "Democratic Republic of the Congo",
  "Ethiopia",
  "Ghana",
  "Kenya",
  "Liberia",
  "Malawi",
  "Mauritius",
  "Mozambique",
  "Namibia",
  "Nigeria",
  "Rwanda",
  "Senegal",
  "Sierra Leone",
  "South Africa",
  "Tanzania",
  "The Gambia",
  "Togo",
  "Uganda",
  "Zambia",
  "Zimbabwe",
] as const;

function marketKey(value: string) {
  return value.trim().toLocaleLowerCase();
}

export function getApprovedMarket(value: string) {
  const key = marketKey(value);
  return SOVRAN_MARKETS.find((market) => marketKey(market) === key);
}

export function parseApprovedMarkets(value: string) {
  const requestedMarkets = value
    .split(",")
    .map((market) => market.trim())
    .filter(Boolean);

  if (requestedMarkets.length === 0 || requestedMarkets.length > 12) return null;

  const approvedMarkets = requestedMarkets.map(getApprovedMarket);
  if (approvedMarkets.some((market) => !market)) return null;

  return [...new Set(approvedMarkets as (typeof SOVRAN_MARKETS)[number][])];
}
