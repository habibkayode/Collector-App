export const numberWithCommas = (x) => {
  if (!x && x !== 0) return null;
  const amount = parseFloat(x).toFixed(2);
  return "₦" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
