import { useRouter } from 'next/router';
import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import { customStyleTable } from './table.style';

export default function TableData({ columns, data, isLoading, ...props }) {
  const { locale } = useRouter();
  const { t } = useTranslation();

  return (
    <DataTable
      fixedHeader
      highlightOnHover
      pointerOnHover
      columns={columns}
      data={data}
      direction={locale === 'ar_SA' ? 'RTL' : 'LTR'}
      progressPending={isLoading}
      theme="solarized"
      customStyles={customStyleTable}
      expandableRows
      expandableRowsHideExpander
      expandOnRowClicked
      paginationComponentOptions={{
        rangeSeparatorText: t('table.rangeSeparatorText'),
        rowsPerPageText: t('table.rowsPerPageText'),
      }}
      paginationRowsPerPageOptions={[20, 30, 50, 100]}
      {...props}
    />
  );
}

createTheme('solarized', {
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#D8DCD6',
  },
  button: {},
  sortFocus: {
    default: '#2aa198',
  },
});
