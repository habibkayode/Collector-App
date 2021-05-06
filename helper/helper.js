export const numberWithCommas = (x) => {
  if (!x) return null;
  const amount = parseFloat(x).toFixed(2);
  return "₦" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
