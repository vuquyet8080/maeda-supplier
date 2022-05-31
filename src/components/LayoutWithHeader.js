import { AUTH_STATUS } from 'constants/auth';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import Sidebar from './SideBar/Sidebar';

function LayoutWithHeader({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const renderLoginBtn = useMemo(() => {
    if (status === AUTH_STATUS.LOADING) {
      return null;
    }
    if (status === AUTH_STATUS.UNAUTHENTICATED) {
      return (
        <Link href="/login">
          <a
            type="button"
            className=" text-white flex items-center bg-black bg-opacity-20 hover:bg-opacity-30 focus:outline-none px-8 py-3 rounded-md"
          >
            تسجيل الدخول
          </a>
        </Link>
      );
    }
  }, [status]);

  const renderSidebar = useMemo(() => {
    if (status !== AUTH_STATUS.LOADING && status !== AUTH_STATUS.UNAUTHENTICATED)
      return (
        <div as="div" className="relative inline-block text-left h-10">
          <Sidebar />
        </div>
      );
    return null;
  }, [status]);

  if (typeof window === 'undefined') return null;

  const renderChildren = () => {
    if (session || router.pathname === '/login') {
      return children;
    }
    return (
      <div className="h-[calc(100vh-90px)] w-full flex  space-y-4 items-center justify-center ">
        <Link href="/login">
          <a className="flex items-center btn-primary px-8 py-3 rounded-md ">تسجيل الدخول</a>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="px-6 py-4 bg-primary-red  flex items-center justify-between flex-row-reverse ">
        <p className="uppercase font-bold text-white ">Maeda Supplier</p>
        {renderLoginBtn}
        {renderSidebar}
      </div>
      {renderChildren()}
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
