import TableData from 'components/TableData';
import { columnsTableTransactionDriver } from 'constants/columsTable/columnsTransaction';
import React from 'react';

const fakeData = [
  {
    id: '11232',
    type: 'FEE',
    value: '3.56',
    date: 'May 18, 2022',
  },
  {
    id: '11232',
    type: 'FEE',
    value: '3.56',
    date: 'May 18, 2022',
  },
  {
    id: '11232',
    type: 'FEE',
    value: '3.56',
    date: 'May 18, 2022',
  },
  {
    id: '11232',
    type: 'FEE',
    value: '3.56',
    date: 'May 18, 2022',
  },
];
export default function DataTableTransaction({ isLoading }) {
  return (
    <TableData
      columns={columnsTableTransactionDriver}
      data={fakeData}
      isLoading={isLoading}
      expandableRows={false}
      selectableRows

      // expandableRowsComponent={() => (
      //   <ExpandableRowsComponent onEdit={onEdit} data={(row) => row} />
      // )}
      // eslint-disable-next-line react/no-unstable-nested-components
      // selectableRows
    />
  );
}
