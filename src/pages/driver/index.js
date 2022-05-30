/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
import { getAmountEarn, getDrivers } from 'actions/driver';
import TableData from 'components/TableData';
import { columnsTableDriver } from 'constants/columsTable/columsDriver';
import { cloneDeep, isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

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
      <div className="border-2 py-6 flex flex-row-reverse px-10"></div>
      <div className="mt-20">
        <TableData columns={columnsTableDriver} data={dataDriver} />
      </div>
    </div>
  );
}
