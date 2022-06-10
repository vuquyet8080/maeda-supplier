import { useTranslation } from 'react-i18next';
import { formatDate } from 'utils/format/date';

export const useColumnsTableTransactionDriver = () => {
  const { t } = useTranslation();

  return [
    {
      name: t('driverDetail.orderId'),
      selector: (row) => row.order_number,
    },
    {
      name: t('driverDetail.type'),
      selector: (row) => row.payment_method,
    },
    {
      name: t('driverDetail.value'),
      selector: (row) => row.amount,
    },
    {
      name: t('driverDetail.date'),
      // selector: (row) => format(new Date(row.created_at), 'yyyy-MM-dd -:- HH:mm'),
      selector: (row) => formatDate(row.created_at),
    },
  ];
};
