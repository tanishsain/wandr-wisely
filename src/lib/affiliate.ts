// Central affiliate config — swap AFFILIATE_TAG for real partner IDs once approved.
export const AFFILIATE_TAG = "wandr-demo";

// Replace these per-network IDs when you have real ones:
const BOOKING_AID = AFFILIATE_TAG; // booking.com aid
const AIRBNB_TAG = AFFILIATE_TAG;
const SKYSCANNER_TAG = AFFILIATE_TAG;
const GETYOURGUIDE_TAG = AFFILIATE_TAG;

export type AffiliateNetwork = "booking" | "airbnb" | "skyscanner" | "getyourguide";

export function bookingHotelsLink(city: string, checkin?: string, checkout?: string) {
  const params = new URLSearchParams({
    ss: city,
    aid: BOOKING_AID,
    label: `wandr-${slug(city)}`,
  });
  if (checkin) params.set("checkin", checkin);
  if (checkout) params.set("checkout", checkout);
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

export function airbnbLink(city: string) {
  const params = new URLSearchParams({
    query: city,
    af: AIRBNB_TAG,
    c: `wandr-${slug(city)}`,
  });
  return `https://www.airbnb.com/s/${encodeURIComponent(city)}?${params.toString()}`;
}

export function skyscannerLink(originCity: string, destCity: string) {
  const params = new URLSearchParams({
    associateid: SKYSCANNER_TAG,
  });
  return `https://www.skyscanner.com/transport/flights/${slug(originCity)}/${slug(
    destCity,
  )}/?${params.toString()}`;
}

export function getYourGuideLink(query: string) {
  const params = new URLSearchParams({
    q: query,
    partner_id: GETYOURGUIDE_TAG,
  });
  return `https://www.getyourguide.com/s/?${params.toString()}`;
}

export function hotelDeepLink(network: AffiliateNetwork, city: string) {
  switch (network) {
    case "booking":
      return bookingHotelsLink(city);
    case "airbnb":
      return airbnbLink(city);
    case "skyscanner":
      return skyscannerLink("anywhere", city);
    case "getyourguide":
      return getYourGuideLink(city);
  }
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
