import { useRouter } from 'next/router';
import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { customStyleTable } from './table.style';

export default function TableData({ columns, data, isLoading, ...props }) {
  const { locale } = useRouter();

  return (
    <div>
      <DataTable
        className="bg-red-500"
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
        {...props}
        paginationComponentOptions={{
          rangeSeparatorText: 'من',
          rowsPerPageText: 'عدد النتائج بالصفحة :',
        }}
      />

      {/* <DataTable columns={columns} data={data} direction="LTR" progressPending={isLoading} theme="solarized" /> */}
    </div>
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
