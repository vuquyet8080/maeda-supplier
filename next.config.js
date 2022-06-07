/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    ADMIN_PREFIX_API: process.env.ADMIN_PREFIX_API,
    PREFIX_API: process.env.PREFIX_API,
  },
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: false,
    trailingSlash: true,
  },
};

module.exports = nextConfig;
