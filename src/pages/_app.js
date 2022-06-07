import LayoutWithHeader from 'components/LayoutWithHeader';
import i18next from 'i18next';
import arabic from 'language/arabic.json';
import english from 'language/english.json';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.scss';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const { locale, push } = useRouter();

  useEffect(() => {
    const language = localStorage.getItem('language');
    push(`/${language}`);
  }, []);

  useEffect(() => {
    localStorage.setItem('language', locale);
  }, [locale]);

  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: locale, // language to use
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
