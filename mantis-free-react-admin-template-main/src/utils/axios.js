import axios from 'axios';
import { getCookie } from './cookie';

export function request(options) {
  let isStatus = false;
  let isSuccess = false;
  let failureStatus = false;
  let setConfig = {};

  setConfig = {
    headers: {
      'Content-Type': options?.headers ? options?.headers['Content-Type'] : 'application/json',
      Authorization: getCookie('ACCESS_TOKEN') || ''
    },
    url: options['url'] || process.env.REACT_APP_API_BASE_URL + options['endpoint'],
    method: options['method'],
    data: options['body'],
    responseType: options?.responseType ? options?.responseType : 'json'
  };

  const config = setConfig;

  return axios
    .request(config)
    .then((response) => {
      let data;
      if (response.request.status === 200 || response.request.status === 201) {
        isSuccess = true;
        data = response.data;
      } else {
        isSuccess = false;
        data = null;
      }
      return { data, isStatus, isSuccess, failureStatus };
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      }
    });
}
