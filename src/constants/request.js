/* eslint-disable prefer-destructuring */

export const URL = process.env.BASE_URL;
export const ADMIN_PREFIX = process.env.ADMIN_PREFIX_API;
export const PREFIX = process.env.PREFIX_API;

export const BASE_URL_ADMIN_PREFIX = URL + ADMIN_PREFIX;
export const BASE_URL_PREFIX = URL + PREFIX;

export const LOGIN = `${BASE_URL_ADMIN_PREFIX}/suppliers/login`;

// driver api
export const DRIVER = `${BASE_URL_ADMIN_PREFIX}/suppliers/drivers`;
export const DRIVER_DETAIL = `${BASE_URL_ADMIN_PREFIX}/companies/drivers`;
export const AMOUNT_EARN = `${BASE_URL_PREFIX}/transactions/amount/earns-today`;
// driver api
