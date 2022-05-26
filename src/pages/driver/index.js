/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
import { getAmountEarn, getDrivers } from 'actions/driver';
import TableData from 'components/TableData';
import React, { useEffect, useState, useRef } from 'react';
import { cloneDeep, isEmpty } from 'lodash';

const columnsTableDriver = [
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

export default function Driver() {
  const [dataDriver, setData] = useState([]);
  const flagGetDataEarn = useRef(false);
  const onGetDriver = async () => {
    const response = await getDrivers({ offset: 1, limit: 10 });
    flagGetDataEarn.current = false;
    setData(response?.data?.data?.results);
  };
  const onGetEarnAmount = async (id) => getAmountEarn({ id });

  useEffect(() => {
    onGetDriver();
  }, []);

  useEffect(() => {
    const onFetchDataEarn = async () => {
      if (!isEmpty(dataDriver) && flagGetDataEarn.current === false) {
        const request = dataDriver.map((item) => onGetEarnAmount(item._id));
        const amountEarns = [];
        await Promise.all(request).then((responseAmountEarns) => {
          responseAmountEarns.map((itemAmountResponse) =>
            amountEarns.push(itemAmountResponse.data)
          );
        });
        const newDataDriver = cloneDeep(dataDriver);
        dataDriver.map((itemDriver, index) => {
          amountEarns.map((item) => {
            if (itemDriver._id === item.driver_id) {
              newDataDriver[index].earnAmount = 200;
            }
            return null;
          });
          return null;
        });
        setData(newDataDriver);
        flagGetDataEarn.current = true;
      }
    };
    onFetchDataEarn();
  }, [dataDriver]);
  return (
    <div>
      <TableData columns={columnsTableDriver} data={dataDriver} />
    </div>
  );
}
