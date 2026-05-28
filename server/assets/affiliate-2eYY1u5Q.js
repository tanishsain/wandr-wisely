import { c as createLucideIcon } from "./site-footer-Cu9GkHUY.js";
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
];
const Ticket = createLucideIcon("ticket", __iconNode);
const AFFILIATE_TAG = "wandr-demo";
const BOOKING_AID = AFFILIATE_TAG;
const AIRBNB_TAG = AFFILIATE_TAG;
const SKYSCANNER_TAG = AFFILIATE_TAG;
const GETYOURGUIDE_TAG = AFFILIATE_TAG;
function bookingHotelsLink(city, checkin, checkout) {
  const params = new URLSearchParams({
    ss: city,
    aid: BOOKING_AID,
    label: `wandr-${slug(city)}`
  });
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}
function airbnbLink(city) {
  const params = new URLSearchParams({
    query: city,
    af: AIRBNB_TAG,
    c: `wandr-${slug(city)}`
  });
  return `https://www.airbnb.com/s/${encodeURIComponent(city)}?${params.toString()}`;
}
function skyscannerLink(originCity, destCity) {
  const params = new URLSearchParams({
    associateid: SKYSCANNER_TAG
  });
  return `https://www.skyscanner.com/transport/flights/${slug(originCity)}/${slug(
    destCity
  )}/?${params.toString()}`;
}
function getYourGuideLink(query) {
  const params = new URLSearchParams({
    q: query,
    partner_id: GETYOURGUIDE_TAG
  });
  return `https://www.getyourguide.com/s/?${params.toString()}`;
}
function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
export {
  ExternalLink as E,
  Ticket as T,
  airbnbLink as a,
  bookingHotelsLink as b,
  getYourGuideLink as g,
  skyscannerLink as s
};
