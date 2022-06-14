import { isNaN } from 'lodash';

export const formatNumber = ({ number, digit = 4, country = 'en-IN', props }) =>
  new Intl.NumberFormat(country, { maximumSignificantDigits: digit, ...props }).format(number);

export const calculateAcceptRate = (cancel, accept) => {
  if (cancel === 0 || accept === 0) {
    return '---';
  }
  return formatNumber({ number: (accept / (cancel + accept)) * 100 });
};
export const renderRate = (rate) => {
  if (isNaN(parseFloat(rate))) {
    return rate;
  }
  return `${rate}%`;
};
