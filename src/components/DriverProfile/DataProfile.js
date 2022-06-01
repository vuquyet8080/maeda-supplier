import React from 'react';

const renderRowData = (name, value) => (
  <div className="grid md:grid-cols-3 grid-cols-2 lg:w-[650px] md:w-[450px] w-full  mb-8">
    <div className="md:col-span-2 col-span-1">{name}:</div>
    <div className="col-span-1">{value}</div>
  </div>
);
export default function DataProfile() {
  return (
    <div className="lg:pt-16 md:pt-14 pt-8">
      {/* <div className="grid md:grid-cols-3 grid-cols-2 lg:w-[650px] md:w-[450px] w-full  mb-8">
        <div className="md:col-span-2 col-span-1">Name:</div>
        <div className="col-span-1">Mohammed Ali</div>
      </div> */}
      {renderRowData('Name', 'Mohammed Ali')}
      {renderRowData('Id', '1655222452')}
      {renderRowData('Acceptance Rate', '95%')}
      {renderRowData('Completion Rate', '95%')}

      {renderRowData('Trips', '33')}
      {renderRowData('Earnings', 'SR 320')}
      {renderRowData('Main Balance', 'SR 383')}
      {renderRowData('Gift Point', 'SR 150')}
    </div>
  );
}
