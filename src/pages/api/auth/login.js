import axios from 'axios';
import { LOGIN } from 'constants/request';

const login = (params) => axios.post(LOGIN, params);

const LoginApi = {
  login,
};

export default LoginApi;
