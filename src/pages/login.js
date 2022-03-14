import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

function Login() {
  const [loading, setLoading] = useState(false);
  const [pid, setPid] = useState('');
  const [password, setPassword] = useState('');
  console.log('🚀 ===== password', password);

  const handleChange = (e, type) => {
    if (type === 'pid') {
      setPid(e.target.value);
    }
    if (type === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = {
        personal_id: pid,
        password,
      };
      const result = await signIn('credentials', { redirect: false, ...values });
      console.log('🚀 ===== result', result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-slate-300 rounded-lg space-y-8 p-8">
        <p className="text-center uppercase text-3xl font-semibold">Paycheck portal</p>
        <div className="grid grid-cols-12 gap-x-2 gap-y-3 items-center max-w-3xl w-full">
          <p className="col-span-4">ID:</p>
          <input
            type="text"
            className="col-span-8 border border-slate-400 rounded-md px-3 py-2"
            onChange={(e) => handleChange(e, 'pid')}
          />
          <p className="col-span-4">Password:</p>
          <input
            type="password"
            className="col-span-8 border border-slate-400 rounded-md px-3 py-2"
            onChange={(e) => handleChange(e, 'password')}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white rounded-md uppercase"
          onClick={handleSubmit}
        >
          login
        </button>
      </div>
    </div>
  );
}

export default Login;
