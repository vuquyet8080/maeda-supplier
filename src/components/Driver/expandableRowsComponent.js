import React from 'react';

export default function ExpandableRowsComponent() {
  return (
    <div className="bg-linen h-20 flex items-center gap-x-5 px-5">
      <button
        type="button"
        className="bg-link-water h-10 rounded-md hover:cursor-pointer hover:bg-opacity-80 flex items-center"
      >
        <div className="text-[#000000] text-sm py-4 px-5">Edit data</div>
      </button>
      {/* <button
        type="button"
        className="bg-green-primary h-10 rounded-md hover:cursor-pointer hover:bg-opacity-80 flex items-center"
      >
        <div className="text-[#1C6F32] text-sm py-4 px-5">Turn on IsPaidByCompany</div>
      </button> */}
      <button
        type="button"
        className="bg-[#000000] h-10 rounded-md hover:cursor-pointer hover:bg-opacity-80 flex items-center"
      >
        <div className="text-white text-sm py-4 px-5">Turn of IsPaidByCompany</div>
      </button>
    </div>
  );
}
