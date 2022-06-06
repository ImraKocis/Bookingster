import {ADMIN_TOKEN} from '@env';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bookingsterapi.oa.r.appspot.com/bookingster/admin/',
  timeout: 1000,
  headers: {authorization: 'Bearer ' + ADMIN_TOKEN},
});

export default instance;
