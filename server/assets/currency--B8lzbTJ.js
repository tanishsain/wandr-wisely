const USD_TO_INR = 83;
function usdToInr(usd) {
  return Math.round(usd * USD_TO_INR);
}
function formatInr(usd) {
  return `Rs.${usdToInr(usd).toLocaleString("en-IN")}`;
}
export {
  formatInr as f
};
