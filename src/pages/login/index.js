import Spin from 'components/Spin';
import { toastMessages } from 'helper/toast';
import { delay } from 'helper/utils';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { mailRegExp } from 'utils/validator';

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();

  const handleChange = (e, type) => {
    if (type === 'email') {
      setEmail(e.target.value);
      if (emailError) {
        setEmailError('');
      }
    }
    if (type === 'password') {
      setPassword(e.target.value);
      if (passwordError) {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async () => {
    let flagError = false;
    if (!mailRegExp.test(email)) {
      setEmailError('بريد إلكتروني خاطئ');
      flagError = true;
    }
    if (password.length < 6) {
      setPasswordError('يجب أن تتكون كلمة المرور الخاصة بك من 6 أحرف على الأقل');
      flagError = true;
    }
    if (flagError) {
      return;
    }
    try {
      setLoading(true);
      const values = {
        email,
        password,
        callbackUrl: `${window.location.origin}`,
      };
      const result = await signIn('credentials', { redirect: false, ...values });
      //
      await delay(100).then(() => setLoading(false));
      if (result?.error === 'Auth failed, email not found') {
        toastMessages('error', 'البريد الإلكتروني غير موجود');
      } else if (result?.error === `Password doesn't match`) {
        toastMessages('error', 'كلمة المرور غير متطابقة');
      }
      if (result?.url) {
        router.push(result?.url);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen drop-shadow-lg px-6 ">
      <div className="drop-shadow-sm border-y-zinc-100 border  rounded-lg space-y-8 p-8 bg-white md:w-1/2 xl:w-96  w-full md:px-12 ">
        <p className="text-center text-3xl font-semibold">تسجيل الدخول</p>
        <div className="grid grid-cols-12 gap-x-2    items-center max-w-3xl w-full ">
          <div className="col-span-12 mb-4 h-16 ">
            <input
              dir="rtl"
              placeholder="أدخل بريدك الإلكتروني"
              type="text"
              className="w-full border border-slate-400 rounded-md px-3 py-2  placeholder:text-gray-300 placeholder:text-sm  text-sm font-normal"
              onChange={(e) => handleChange(e, 'email')}
            />
            {emailError.length > 0 && (
              <span className="mt-2   block text-sm text-red-500 text-right">{emailError}</span>
            )}
          </div>
          <div className="col-span-12 ">
            <input
              dir="rtl"
              placeholder="كلمه السر"
              type="password"
              className="w-full border border-slate-400 rounded-md px-3 py-2 placeholder:text-gray-300 placeholder:text-sm text-sm font-normal"
              onChange={(e) => handleChange(e, 'password')}
            />
            {passwordError.length > 0 && (
              <span className="mt-2   block text-sm text-red-500 text-right">{passwordError}</span>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center relative">
          <button
            type="submit"
            className="w-full px-4 py-3 btn-primary rounded-md "
            onClick={handleSubmit}
            disabled={loading}
          >
            كلمه السر
          </button>
          <div className="absolute right-0  w-6 h-6 mr-4">{loading && <Spin />}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
