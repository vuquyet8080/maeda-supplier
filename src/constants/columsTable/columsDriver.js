import { isEmpty } from 'lodash';
import { formatDate } from 'utils/format/date';
import { calculateAcceptRate, formatNumber, renderRate } from 'utils/format/number';

const { useTranslation } = require('react-i18next');

const renderStatus = (status) => {
  if (status) {
    return 'active';
  }
  return 'inActive';
};

export const useColumnsTableDriver = () => {
  const { t } = useTranslation();

  return [
    {
      name: t('driver.name'),
      selector: (row) => row.name,
    },
    {
      name: t('driver.id'),
      selector: (row) => row.id_number,
    },
    {
      name: t('driver.status'),
      selector: (row) => renderStatus(row.isActive),
    },
    {
      name: t('driver.rate'),
      selector: (row) =>
        renderRate(calculateAcceptRate(row.cancel_orders_total, row.accept_orders_total)),
    },
    {
      name: t('driver.trips'),
      selector: (row) => (isEmpty(row.trips) ? 0 : formatNumber({ number: row.trips[0].count })),
    },
    {
      name: t('driver.earning'),
      selector: (row) => (row?.earnAmount ? formatNumber({ number: row?.earnAmount }) : 0),
    },
    {
      name: t('driver.mainBalance'),
      selector: (row) =>
        isEmpty(row.balances) ? 0 : formatNumber({ number: row.balances[0].new_balance }),
    },
    {
      name: t('driver.point'),
      selector: (row) => row.year,
    },
    {
      name: t('driver.createAt'),
      selector: (row) => (row?.created_at ? formatDate(row?.created_at) : ''),
      width: '200px',
    },
  ];
};
