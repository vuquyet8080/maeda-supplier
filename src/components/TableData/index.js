import React from 'react';
import DataTable from 'react-data-table-component';

export default function TableData({ columns, data }) {
  return (
    <div>
      <DataTable columns={columns} data={data} direction="RTL" />
    </div>
  );
}
