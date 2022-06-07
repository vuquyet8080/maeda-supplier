import { Menu, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/solid';
import { AUTH_STATUS } from 'constants/auth';
import { getSession, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';

const renderLocalesName = (locales) => {
  switch (locales) {
    case 'ar':
      return 'Arabic';
    case 'en':
      return 'English';
    default:
      return '';
  }
};

function LayoutWithHeader({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [collapse, setCollapse] = useState(false);
  const { t } = useTranslation();
  const { locales, locale } = useRouter();
  const { asPath } = router;

  //
  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    const lang = locale === 'ar' ? 'ar' : 'en';
    const timerOutId = setTimeout(() => {
      document.querySelector('html').setAttribute('dir', dir);
      document.querySelector('html').setAttribute('lang', lang);
    }, 100);
    return () => {
      clearTimeout(timerOutId);
    };
  }, [locale]);
  //

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const renderLoginBtn = useMemo(() => {
    if (status === AUTH_STATUS.LOADING) {
      return null;
    }
    if (status === AUTH_STATUS.UNAUTHENTICATED) {
      return (
        <Link href="/login">
          <a
            type="button"
            className="flex items-center bg-black bg-opacity-20 hover:bg-opacity-30 focus:outline-none px-8 py-3 rounded-md text-white"
          >
            {t('menu.login')}
          </a>
        </Link>
      );
    }
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full p-2 font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex items-center justify-between  text-sm">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-500 uppercase">
                <div className="w-6 h-6 ">
                  <UserIcon className="text-white" />
                </div>
              </div>
              <div>
                <p>{session?.user?.name}</p>
              </div>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 rtl:right-0 w-56 mt-2 origin-top-right text-sm bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  type="button"
                  className="flex items-center rtl:justify-end btn-primary-reverse focus:outline-none px-4 py-3 rounded-md capitalize w-full"
                  onClick={signOut}
                >
                  {t('menu.logout')}
                </button>
              </Menu.Item>
            </div>
            {locales?.map(
              (localeItem) =>
                localeItem !== locale && (
                  <div className="px-1 py-1" key={localeItem}>
                    <Menu.Item>
                      <div>
                        <Link href={`/${localeItem}/${asPath}`} locale={false}>
                          <a className="bg-red-700  h-full py-3 flex items-center px-4 rtl:justify-end btn-primary-reverse focus:outline-none  rounded-md capitalize w-full">
                            {/* set {renderLocalesName(localeItem)} language */}
                            {t('menu.titleChangeLanguage', {
                              language: renderLocalesName(localeItem),
                            })}
                          </a>
                        </Link>
                      </div>
                    </Menu.Item>
                  </div>
                )
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }, [status, locale, asPath]);

  if (typeof window === 'undefined') return null;

  const renderChildren = () => {
    if (session) {
      return (
        <div
          className={`w-full  transition duration-350 ease-linear ${
            // collapse ? 'rtl:lg:pr-[58px] ltr:lg:pl-[58px]' : 'rtl:lg:pr-[250px] ltr:lg:pl-[250px]'
            collapse
              ? 'rtl:lg:-translate-x-[58px] ltr:lg:translate-x-[58px] lg:w-[calc(100vw-58px)] '
              : 'rtl:lg:-translate-x-[250px] ltr:lg:translate-x-[250px] lg:w-[calc(100vw-250px)] '
          } ${
            collapse
              ? 'rtl:pr-[58px] ltr:pl-[58px] rtl:lg:pr-0 ltr:lg:pl-0'
              : 'rtl:lg:pr-0 ltr:lg:pl-0 rtl:pr-[58px] ltr:pl-[58px]'
          }
          `}
        >
          {children}
        </div>
      );
    }
    if (router.pathname === '/login') {
      return <div className="w-full">{children}</div>;
    }
    return (
      <div className="h-[calc(100vh-90px)] w-full flex  space-y-4 items-center justify-center ">
        <Link href="/login">
          <a className="flex items-center btn-primary px-8 py-3 rounded-md ">{t('menu.login')}</a>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="px-6 h-16 bg-primary-red flex items-center justify-between fixed w-full top-0 left-0 right-0 z-20">
        {renderLoginBtn}
      </div>
      {/* <div className="flex justify-between pt-[64px]"> */}
      <div className="flex justify-between pt-[64px] h-[100vh]">
        {renderChildren()}
        <Navbar isLogin={!!session?.user} collapse={collapse} handleCollapse={handleCollapse} />
      </div>
    </>
  );
}

export default LayoutWithHeader;

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
