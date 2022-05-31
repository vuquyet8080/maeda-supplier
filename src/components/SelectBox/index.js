import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';

export default function index({ valueSelect, handleSelection, onRemove, optionData, isSelected }) {
  return (
    <Listbox as="div" className="gap-1 h-full" value={valueSelect} onChange={handleSelection}>
      {({ open }) => (
        <div className="relative h-full">
          <span className="inline-block w-full rounded-md shadow-sm h-full ">
            <Listbox.Button className=" cursor-default relative w-full h-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-400 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              {!valueSelect.length && (
                <div className="gap-2 flex flex-wrap">
                  <span className="text-gray-300 h-6 py-1 text-sm">حدد الحالة</span>
                </div>
              )}
              <div className="gap-2 flex flex-wrap ">
                {valueSelect.map((person) => (
                  <div
                    key={person}
                    className="inline-flex items-center rounded bg-gray-200 px-2 py-1 h-6 "
                  >
                    <button
                      type="button"
                      className="bg-gray-100 rounded-full cursor-pointer"
                      onClick={() => onRemove(person)}
                    >
                      <span className="pointer-events-none">
                        <XIcon className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </button>
                    <div className="ml-3 text-xs ">{person}</div>
                  </div>
                ))}
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
          </span>

          <Transition
            show={open}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10"
          >
            <Listbox.Options
              static
              className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
            >
              {optionData?.map((person) => {
                const selected = isSelected(person);
                return (
                  <Listbox.Option key={person} value={person}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'text-white bg-blue-600' : 'text-gray-900'
                        } cursor-default select-none relative py-2 pl-8 pr-10 flex flex-row-reverse`}
                      >
                        <span
                          className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}
                        >
                          {person}
                        </span>
                        {selected && (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-blue-600'
                            } absolute inset-y-0 right-3 flex items-center pl-1.5`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
