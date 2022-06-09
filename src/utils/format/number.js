export const formatNumber = ({ number, digit = 4, country = 'en-IN', props }) =>
  new Intl.NumberFormat(country, { maximumSignificantDigits: digit, ...props }).format(number);
