import { XIcon } from '@heroicons/react/solid';
import { DashboardIcon, DriverIcon, SignOutIcon } from 'constants/icon';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const menuItems = [
    {
      id: 1,
      name: 'Driver',
      url: '/driver',
      icon: <DriverIcon />,
    },
    {
      id: 2,
      name: 'Dashboard',
      url: '/#',
      icon: <DashboardIcon />,
    },
  ];

  const hiddenNavBar = () => {
    setShowSidebar(false);
  };
  const showNavBar = () => {
    setShowSidebar(true);
  };
  return (
    <>
      {showSidebar ? (
        <button
          type="button"
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-5 z-50"
          onClick={hiddenNavBar}
        >
          <div className="w-10 h-10 ">
            <XIcon className="text-primary-red" />
          </div>
        </button>
      ) : (
        <svg
          onClick={showNavBar}
          className="fixed z-30 flex items-center cursor-pointer right-10 top-5"
          fill="white"
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
          <button type="button" key={itemNav.id} onClick={hiddenNavBar} className="block w-full">
            <Link href={itemNav.url} key={itemNav.id}>
              <a className="pl-4 md:mb-2  mb-1 flex items-center space-x-1 rounded-md px-2 md:py-3 py-2 hover:bg-gray-100 hover:text-blue-600">
                <div className="w-8 h-8 flex justify-center items-center ">
                  <span className="pr-2">{itemNav.icon}</span>
                </div>
                <span className="text-xs md:text-sm">{itemNav.name}</span>
              </a>
            </Link>
          </button>
        ))}
        <button type="button" className="w-full" onClick={signOut}>
          <div className=" pl-4 md:mb-2  mb-1 flex items-center space-x-1 rounded-md px-2 md:py-3 py-2 hover:bg-gray-100 hover:text-blue-600">
            <div className="w-8 h-8 flex justify-center items-center ">
              <span className="pr-2">
                <SignOutIcon />
              </span>
            </div>
            <span className="text-xs md:text-sm">Sign out</span>
          </div>
        </button>
      </div>
    </>
  );
}

export default Sidebar;
