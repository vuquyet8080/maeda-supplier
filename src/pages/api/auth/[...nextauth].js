import NextAuth, { CallbacksOptions, NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import LoginApi from './login';

export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    Credentials({
      name: 'Paycheck Portal',
      async authorize(credentials, req) {
        try {
          const res = await LoginApi.login({
            personal_id: credentials.personal_id,
            password: credentials.password,
          });
          if (res.data.status && res.data) {
            const user = res.data;
            return user;
          }
          return null;
        } catch (error) {
          throw new Error(error?.response?.data?.message || 'REQUEST_ERROR');
        }
        // return user;
      },
    }),
  ],
  // callbacks: {
  //   async jwt(token, user, account, profile, isNewUser) {
  //     if (user) {
  //       token.jwt = user.token;
  //       token.user = user.user;
  //     }
  //     return token;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     if (url.startsWith(baseUrl)) return url;
  //     // Allows relative callback URLs
  //     if (url.startsWith('/')) return new URL(url, baseUrl).toString();
  //     return baseUrl;
  //   },
  //   async session(session, user) {
  //     if (user) {
  //       session.accessToken = user.jwt;
  //       session.user = user.user;
  //     }

  //     return session;
  //   },
  // },
  // session: {
  //   jwt: true,
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  //   updateAge: 24 * 60 * 60, // 24 hours
  // },
});
