import React from 'react';

export default function index({ onChange, type, placeholder, ...props }) {
  return (
    <div className=" h-full w-full border-slate-300 border rounded-md">
      <input
        dir="rtl"
        placeholder={placeholder}
        type={type}
        className=" w-full h-full rounded-md px-3 focus:outline focus:outline-blue-400  placeholder:text-gray-300 placeholder:text-sm  text-sm font-normal"
        onChange={(e) => onChange(e, type)}
        {...props}
      />
    </div>
  );
}
