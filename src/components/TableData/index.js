import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { customStyleTable } from './table.style';

export default function TableData({ columns, data, isLoading }) {
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
  button: {
    default: '#2aa198',
    // hover: 'rgba(0,0,0,.08)',
    hover: 'red',
    focus: 'rgba(255,255,255,.12)',
    disabled: 'rgba(255, 255, 255, .34)',
  },
  sortFocus: {
    default: '#2aa198',
  },
});
