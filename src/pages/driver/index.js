/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
import { getAmountEarn, getDrivers } from 'actions/driver';
import CustomInput from 'components/CustomInput';
import ExpandableRowsComponent from 'components/Driver/expandableRowsComponent';
import SelectBox from 'components/SelectBox';
import TableData from 'components/TableData';
import { columnsTableDriver } from 'constants/columsTable/columsDriver';
import { cloneDeep, isEmpty } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const status = ['active', 'deactivate'];

export default function Driver() {
  const [searchByName, setSearchByName] = useState('');
  const [searchById, setSearchById] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // filter
  const [selectedPersons, setSelectedPersons] = useState([]);
  const statusFilter = useMemo(
    () => selectedPersons.map((itemFilter) => ({ value: itemFilter })),
    [selectedPersons]
  );
  const isSelected = (value) => !!selectedPersons.find((el) => el === value);

  const removeItem = (person) => {
    const removedSelection = selectedPersons.filter((selected) => selected !== person);
    setSelectedPersons(removedSelection);
  };

  const handleSelection = (person) => {
    const selectedResult = selectedPersons.filter((selected) => selected === person);
    if (selectedResult.length) {
      removeItem(person);
    } else {
      setSelectedPersons((currents) => [...currents, person]);
    }
  };
  // filter

  // data table driver
  const [dataDriver, setData] = useState([]);
  const flagGetDataEarn = useRef(false);

  const onGetDriver = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      const response = await getDrivers({
        offset: 1,
        limit: 10,
        status: statusFilter,
        idNumber: searchById,
        name: searchByName,
      });
      flagGetDataEarn.current = false;
      setData(response?.data?.data?.results);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };
  const onGetEarnAmount = async (id) => getAmountEarn({ id });

  useEffect(() => {
    onGetDriver();
  }, [searchByName, searchById, statusFilter]);

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
  // data table driver

  // filter

  const handleChange = (e, type) => {
    if (type === 'name') {
      setSearchByName(e.target.value);
    } else {
      setSearchById(e.target.value);
    }
  };
  // filter

  // action ExpandableRowsComponent

  // action ExpandableRowsComponent

  return (
    <div>
      <div className="py-6 md:flex flex-row px-10 grid gap-y-4 md:gap-y-0 gap-x-4">
        <div className="w-full max-w-xs">
          <SelectBox
            valueSelect={selectedPersons}
            onRemove={removeItem}
            handleSelection={handleSelection}
            optionData={status}
            isSelected={isSelected}
          />
        </div>
        <div className="w-full max-w-xs  h-11">
          <CustomInput onChange={handleChange} type="name" placeholder="Name driver" />
        </div>
        <div className="w-full max-w-xs h-11">
          <CustomInput onChange={handleChange} type="id" placeholder="Id driver" />
        </div>
      </div>
      <div className="mt-4">
        <TableData
          columns={columnsTableDriver}
          data={dataDriver}
          isLoading={isLoading}
          expandableRows
          // expandableRowsComponent={() => (
          //   <ExpandableRowsComponent onEdit={onEdit} data={(row) => row} />
          // )}
          // eslint-disable-next-line react/no-unstable-nested-components
          expandableRowsComponent={({ data }) => <ExpandableRowsComponent data={data} />}
          selectableRows
        />
      </div>
    </div>
  );
}
