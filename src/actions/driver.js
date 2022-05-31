import { AMOUNT_EARN, DRIVER } from 'constants/request';
import fetchApi from 'helper/fetchApi';

export const getDrivers = ({ offset, limit, status }) =>
  fetchApi({
    url: DRIVER,
    options: {
      method: 'GET',
    },
    params: {
      offset,
      limit,
      filters: {
        status,
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
