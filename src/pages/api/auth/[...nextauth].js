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
    async jwt({ user }) {
      if (user)
        return {
          user,
        };
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt',
  },
});
