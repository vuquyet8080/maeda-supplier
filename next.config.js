/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    ADMIN_PREFIX_API: process.env.ADMIN_PREFIX_API,
    PREFIX_API: process.env.PREFIX_API,
  },
  i18n: {
    locales: ['en-US', 'ar_SA'],
    // defaultLocale: 'en-US',
    defaultLocale: 'ar_SA',
  },
};

module.exports = nextConfig;
