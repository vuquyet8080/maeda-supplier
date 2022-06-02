import { getInfoDriverDetail } from 'actions/driver';
import React, { useEffect, useState } from 'react';

const renderRowData = (name, value) => (
  <div className="grid md:grid-cols-3 grid-cols-2 lg:w-[650px] md:w-[450px] w-full  mb-8">
    <div className="md:col-span-2 col-span-1 text-xs md:text-sm ">{name}:</div>
    <div className="col-span-1 text-xs md:text-sm ">{value}</div>
  </div>
);
export default function DataProfile({ idDriver }) {
  const [dataProfile, setDataProfile] = useState();

  const fetchDataDetailDriver = async () => {
    try {
      const response = await getInfoDriverDetail({ id: idDriver });
      const {
        data: { name },
      } = response;
      setDataProfile([{ title: 'Name', value: name }]);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchDataDetailDriver();
  }, []);

  return (
    <div className="lg:pt-16 md:pt-14 pt-8">
      {/* <div className="grid md:grid-cols-3 grid-cols-2 lg:w-[650px] md:w-[450px] w-full  mb-8">
        <div className="md:col-span-2 col-span-1">Name:</div>
        <div className="col-span-1">Mohammed Ali</div>
      </div> */}
      {/* {renderRowData('Name', 'Mohammed Ali')}
      {renderRowData('Id', '1655222452')}
      {renderRowData('Acceptance Rate', '95%')}
      {renderRowData('Completion Rate', '95%')}

      {renderRowData('Trips', '33')}
      {renderRowData('Earnings', 'SR 320')}
      {renderRowData('Main Balance', 'SR 383')}
      {renderRowData('Gift Point', 'SR 150')} */}
      {dataProfile?.map((item, index) => (
        <div key={index}>{renderRowData(item.title, item.value)}</div>
      ))}
    </div>
  );
}
