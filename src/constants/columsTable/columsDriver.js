const { useTranslation } = require('react-i18next');

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
      selector: (row) => row.title,
    },
    {
      name: t('driver.rate'),
      selector: (row) => row.year,
    },
    {
      name: t('driver.trips'),
      selector: (row) => row.title,
    },
    {
      name: t('driver.earning'),
      selector: (row) => (row?.earnAmount ? row?.earnAmount : 0),
    },
    {
      name: t('driver.mainBalance'),
      selector: (row) =>
        row.balances.length > 0 ? row.balances[0].new_balance.toFixed(3) : '0.000',
    },
    {
      name: t('driver.point'),
      selector: (row) => row.year,
    },
  ];
};
