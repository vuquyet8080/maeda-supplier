import { AMOUNT_EARN, DRIVER, DRIVER_DETAIL } from 'constants/request';
import fetchApi from 'helper/fetchApi';

export const getDrivers = ({ page, limit, status, idNumber, name, ...props }) =>
  fetchApi({
    url: DRIVER,
    options: {
      method: 'GET',
    },
    params: {
      page,
      limit,
      filters: {
        status,
        id_number: idNumber,
        name,
        ...props,
      },
    },
  });

export const getAmountEarn = ({ id }) =>
  fetchApi({
    url: `${AMOUNT_EARN}/${id}`,
    options: {
      method: 'GET',
    },
  });

export const getInfoDriverDetail = ({ id }) =>
  fetchApi({
    url: `${DRIVER_DETAIL}/${id}`,
    options: {
      method: 'GET',
    },
  });

export const getTransactionHistory = ({ page, limit, id }) =>
  fetchApi({
    url: `${DRIVER_DETAIL}/${id}/transactions`,
    options: {
      method: 'GET',
    },
    params: {
      page,
      limit,
    },
  });
