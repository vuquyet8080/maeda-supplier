import React from 'react';
import DataTable from 'react-data-table-component';

export default function TableData({ columns, data, isLoading }) {
  return (
    <div>
      <DataTable columns={columns} data={data} direction="RTL" progressPending={isLoading} />

      {/* <DataTable columns={columns} data={data} direction="LTR" progressPending={isLoading} /> */}
    </div>
  );
}
