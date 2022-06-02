import { format } from 'date-fns';

export const columnsTableTransactionDriver = [
  {
    name: 'Order ID',
    selector: (row) => row.order_number,
  },
  {
    name: 'Type',
    selector: (row) => row.payment_method,
  },
  {
    name: 'Value ',
    selector: (row) => row.amount,
  },
  {
    name: 'Date ',
    selector: (row) => format(new Date(row.created_at), 'yyyy-MM-dd -:- HH:mm'),
  },
];
