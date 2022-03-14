import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useMemo, useState } from 'react';
import { AUTH_STATUS } from 'constants/auth';
import Link from 'next/link';

function LayoutWithHeader({ children }) {
  const { data: session, status } = useSession();
  console.log('🚀 ===== session, status', session, status);

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (status === AUTH_STATUS.AUTHENTICATED) {
      setIsLogin(true);
    }
  }, [status]);

  const renderLoginBtn = useMemo(() => {
    if (status === AUTH_STATUS.LOADING) {
      return null;
    }
    if (status === AUTH_STATUS.UNAUTHENTICATED) {
      return (
        <Link href="/login">
          <a
            type="button"
            className="flex items-center bg-slate-500 hover:bg-slate-400 active:bg-slate-600 px-8 py-3 rounded-md"
          >
            Login
          </a>
        </Link>
      );
    }
    return (
      <div className="flex items-center justify-between space-x-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-500">
          TM
        </div>
        <p>Hehe boi</p>
      </div>
    );
  }, [status]);

  return (
    <>
      <div className="px-6 py-4 bg-[#00a6f5] text-white flex items-center justify-between">
        <p className="uppercase font-bold">paycheck portal</p>
        {renderLoginBtn}
      </div>
      {children}
    </>
  );
}

export default LayoutWithHeader;
