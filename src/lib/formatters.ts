export const formateCurrency = (value: number): string => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  return CURRENCY_FORMATTER;
};
