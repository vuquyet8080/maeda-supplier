import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { customStyleTable } from './table.style';

export default function TableData({ columns, data, isLoading, ...props }) {
  return (
    <div>
      <DataTable
        highlightOnHover
        pointerOnHover
        columns={columns}
        data={data}
        direction="RTL"
        progressPending={isLoading}
        theme="solarized"
        customStyles={customStyleTable}
        expandableRows
        expandableRowsHideExpander
        expandOnRowClicked
        {...props}
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
