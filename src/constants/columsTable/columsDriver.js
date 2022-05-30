export const columnsTableDriver = [
  {
    name: 'Name',
    selector: (row) => row.name,
  },
  {
    name: 'ID',
    selector: (row) => row.id_number,
  },
  {
    name: 'Status',
    selector: (row) => row.title,
  },
  {
    name: 'Acceptance Rate',
    selector: (row) => row.year,
  },
  {
    name: 'Trips',
    selector: (row) => row.title,
  },
  {
    name: 'Earnings',
    selector: (row) => (row?.earnAmount ? row?.earnAmount : 0),
  },
  {
    name: 'Main balance',
    selector: (row) => (row.balances.length > 0 ? row.balances[0].new_balance.toFixed(3) : '0.000'),
  },
  {
    name: 'Gift point',
    selector: (row) => row.year,
  },
];
