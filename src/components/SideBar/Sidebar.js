import { useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { Dashboard, Driver } from 'constants/icon';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const menuItems = [
    {
      id: 1,
      name: 'Driver',
      url: '/driver',
      icon: <Driver />,
    },
    {
      id: 2,
      name: 'Dashboard',
      url: '#',
      icon: <Dashboard />,
    },
  ];
  return (
    <>
      {showSidebar ? (
        <button
          type="button"
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-5 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <div className="w-10 h-10 ">
            <XIcon className="text-primary-red" />
          </div>
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed z-30 flex items-center cursor-pointer right-10 top-5"
          fill="#2563EB"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10" />
          <rect y="30" width="100" height="10" />
          <rect y="60" width="100" height="10" />
        </svg>
      )}

      <div
        className={`pt-20 top-0 right-0 2xl:w-80 lg:w-72  w-1/2  sm:w-64 bg-white drop-shadow-2xl  px-5  fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? 'translate-x-0 ' : 'translate-x-full'
        }`}
      >
        {menuItems.map((itemNav) => (
          <Link href={itemNav.url} key={itemNav.id}>
            <a className="md:mb-2  mb-1 flex items-center space-x-1 rounded-md px-2 md:py-3 py-2 hover:bg-gray-100 hover:text-blue-600">
              <span className="text-2xl">
                <i className="bx bx-cart" />
              </span>
              <div className="w-8 h-8 flex justify-center items-center ">
                <span className="pr-2">{itemNav.icon}</span>
              </div>
              <span className="text-xs md:text-sm">{itemNav.name}</span>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
