import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://bookingsterapi.oa.r.appspot.com/bookingster/api/',
  timeout: 1000,
});

export default apiInstance;
