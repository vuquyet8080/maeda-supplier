import { AMOUNT_EARN, DRIVER } from 'constants/request';
import fetchApi from 'helper/fetchApi';

export const getDrivers = ({ offset, limit, status, idNumber, name }) =>
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
        id_number: idNumber,
        name,
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
