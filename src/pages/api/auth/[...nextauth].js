/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import LoginApi from './login';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        try {
          const res = await LoginApi.login({
            email: credentials.email,
            password: credentials.password,
          });
          if (res.data) {
            return res.data;
          }
          return null;
        } catch (error) {
          throw new Error(error?.response?.data?.message || 'REQUEST_ERROR');
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token?.accessToken;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
});
