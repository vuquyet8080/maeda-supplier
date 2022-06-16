import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { formatDate } from 'utils/format/date';
import { formatNumber } from 'utils/format/number';

const { useTranslation } = require('react-i18next');

const renderStatus = (status) => {
  if (status) {
    return 'active';
  }
  return 'inActive';
};

export const useColumnsTableDriver = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return [
    {
      name: t('driver.name'),
      selector: (row) => row.name,
      width: '250px',
    },
    {
      name: t('driver.id'),
      selector: (row) => row.id_number,
      width: '200px',
    },
    {
      name: t('driver.status'),
      selector: (row) => renderStatus(row.isActive),
      width: '200px',
    },
    {
      name: t('driver.rate'),
      selector: (row) =>
        row?.acceptanceRate ? (
          // <div className={`flex ${locale === 'ar' ? 'flex-row-reverse' : 'lex-row-reverse'}`}>
          <div className="flex flex-row">
            <div>{formatNumber({ number: row?.acceptanceRate })}</div>
            <div> %</div>
          </div>
        ) : (
          '---'
        ),
      width: '150px',
    },
    {
      name: t('driver.trips'),
      selector: (row) => (isEmpty(row.trips) ? 0 : formatNumber({ number: row.trips[0].count })),
      width: '150px',
    },
    {
      name: t('driver.earning'),
      selector: (row) => (row?.earnAmount ? formatNumber({ number: row?.earnAmount }) : 0),
      width: '150px',
    },
    {
      name: t('driver.mainBalance'),
      selector: (row) =>
        isEmpty(row.balances) ? 0 : formatNumber({ number: row.balances[0].new_balance }),
      width: '250px',
    },
    {
      name: t('driver.point'),
      selector: (row) => row.year,
      width: '150px',
    },
    {
      name: t('driver.createAt'),
      selector: (row) => (row?.created_at ? formatDate(row?.created_at) : ''),
    },
  ];
};
