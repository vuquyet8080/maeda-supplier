import { delay } from 'helper/utils';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleChange = (e, type) => {
    if (type === 'email') {
      setEmail(e.target.value);
    }
    if (type === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = {
        email,
        password,
        callbackUrl: `${window.location.origin}`,
      };
      const result = await signIn('credentials', { redirect: false, ...values });

      await delay(100).then(() => setLoading(false));

      if (result?.url) {
        router.push(result?.url);
      }
    } catch (error) {}
  };
  return (
    <div className="flex items-center justify-center h-screen drop-shadow-lg px-6 ">
      <div className="drop-shadow-sm border-y-zinc-100 border  rounded-lg space-y-8 p-8 bg-white md:w-1/2 xl:w-96  w-full md:px-12 ">
        <p className="text-center text-3xl font-semibold">تسجيل الدخول</p>
        <div className="grid grid-cols-12 gap-x-2 md:gap-y-5 gap-y-3  items-center max-w-3xl w-full ">
          <input
            dir="rtl"
            placeholder="أدخل بريدك الإلكتروني"
            type="text"
            className="col-span-12 border border-slate-400 rounded-md px-3 py-2  placeholder:text-gray-300 placeholder:text-sm  text-sm font-normal"
            onChange={(e) => handleChange(e, 'email')}
          />

          <input
            dir="rtl"
            placeholder="كلمه السر"
            type="password"
            className="col-span-12 border border-slate-400 rounded-md px-3 py-2 placeholder:text-gray-300 placeholder:text-sm text-sm font-normal"
            onChange={(e) => handleChange(e, 'password')}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 btn-primary rounded-md "
          onClick={handleSubmit}
          disabled={loading}
        >
          كلمه السر
        </button>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const csrfToken = await getCsrfToken(context);
//   return { props: { csrfToken } };
// }

export default Login;
