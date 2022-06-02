export const columnsTableTransactionDriver = [
  {
    name: 'Order ID',
    selector: (row) => row.order_number,
  },
  {
    name: 'Type',
    selector: (row) => row.type,
  },
  {
    name: 'Value ',
    selector: (row) => row.amount,
  },
  {
    name: 'Date ',
    selector: (row) => row.created_at,
  },
];
