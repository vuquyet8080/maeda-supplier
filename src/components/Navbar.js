import { DashboardIcon, DriverIcon, IconExpandNav } from 'constants/icon';
import { delay } from 'helper/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function Navbar({ isLogin, collapse, handleCollapse }) {
  const [showMenuText, setShowMenuText] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (collapse) {
      setShowMenuText(!collapse);
    } else {
      delay(200).then(() => setShowMenuText(!collapse));
    }
  }, [collapse]);

  const menuItems = [
    {
      id: 1,
      name: t('menu.driver'),
      url: '/driver',
      icon: <DriverIcon />,
    },
    {
      id: 2,
      name: t('menu.dashboard'),
      url: '/dashboard',
      icon: <DashboardIcon />,
    },
  ];

  if (!isLogin) return null;

  return (
    <div
      className={`bg-gray-100 w-full ${
        collapse ? 'max-w-[56px]' : 'max-w-[250px]'
      } h-[calc(100vh-72px)] items-end fixed rtl:right-0 ltr:left-0 transition-all duration-300 z-10`}
    >
      <div className="w-full h-full flex flex-col justify-between divide-y">
        <div className="w-full p-1 gap-1 flex flex-col">
          {menuItems.map((menu) => (
            <Link href={menu.url} key={menu.id}>
              <a
                className={`${
                  router.pathname.includes(menu.url) ? 'bg-red-400 text-white font-bold' : ''
                } ltr:flex-row-reverse flex items-center justify-end py-2 rounded-md w-full hover:bg-red-400 relative group hover:text-white ${
                  collapse && showMenuText ? 'flex justify-center items-center' : 'space-x-2 pl-1'
                }
                `}
              >
                <span className={`text-sm ${showMenuText ? 'block px-2' : 'hidden'}`}>
                  {menu.name}
                </span>
                <div className="space-x-0 m-0 p-0">{menu.icon}</div>
              </a>
            </Link>
          ))}
        </div>
        <button
          className="py-2 px-3 hover:bg-gray-300 flex items-center justify-center"
          type="button"
          onClick={handleCollapse}
        >
          {!showMenuText ? (
            <div className="ltr:rotate-180">
              <IconExpandNav />
            </div>
          ) : (
            'Collapse'
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
