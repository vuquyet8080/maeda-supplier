import LayoutWithHeader from 'components/LayoutWithHeader';
import i18next from 'i18next';
import arabic from 'language/arabic.json';
import english from 'language/english.json';
import { SessionProvider } from 'next-auth/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.scss';

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'ar', // language to use
  debug: true,
  resources: {
    en: {
      translation: english, // 'common' is our custom namespace
    },
    ar: {
      translation: arabic,
    },
  },
});
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <I18nextProvider i18n={i18next}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <LayoutWithHeader>
          <Component {...pageProps} />
          <ToastContainer />
        </LayoutWithHeader>
      </SessionProvider>
    </I18nextProvider>
  );
}
