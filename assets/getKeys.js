import {ADMIN_TOKEN} from '@env';
import axios from 'axios';

const api_get_googleKey = async () => {
  const instance = axios.create({
    baseURL: 'https://bookingsterapi.oa.r.appspot.com/bookingster/admin/',
    timeout: 1000,
    headers: {authorization: 'Bearer ' + ADMIN_TOKEN},
  });

  var result = await instance.get('configuration');
  return result.data;
};

export default api_get_googleKey;
