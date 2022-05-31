import LayoutWithHeader from 'components/LayoutWithHeader';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.scss';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <LayoutWithHeader>
        <Component {...pageProps} />
        <ToastContainer />
      </LayoutWithHeader>
    </SessionProvider>
  );
}
