type Formatter = (value: number) => string;

function getCurrencyFormatter(
  locale: Intl.LocalesArgument,
  currency: string,
): Formatter {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    maximumFractionDigits: 2,
    currency,
  });

  return formatter.format;
}

export default getCurrencyFormatter;
