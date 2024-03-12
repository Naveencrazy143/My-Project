import axios from 'axios';
import { USER_TOKEN, showToast } from '@Utils'
const BUILD_TYPE_LIVE = 1;
const BUILD_TYPE_LIVE_DEMO = 2;
const BUILD_TYPE_STAGING = 3;
const BUILD_TYPE_LOCAL = 4;

const BUILD_TYPE = BUILD_TYPE_LOCAL;
// https://edatapi.quantaone.in
// https://api.quantaedat.com
export const SERVER =
  BUILD_TYPE === BUILD_TYPE_LIVE
    ? 'https://api5.quantaedat.com'
    : BUILD_TYPE === BUILD_TYPE_LIVE_DEMO
      ? 'live_local'
      : BUILD_TYPE === BUILD_TYPE_STAGING
        ? 'http://103.118.188.135:8010'
        : 'http://192.168.15.126:8001';

const axiosApi = axios.create({
  baseURL: SERVER,
  timeout: 50000,
});

axios.interceptors.request.use(function (config) {
  return config;
});

const getHeaders = async () => {
  try {

    const value = localStorage.getItem(USER_TOKEN);

    console.log(JSON.stringify(value) + "+===Token");

    if (value) {
      return { Authorization: 'Token ' + value };
    } else {
      return {};
    }
  } catch (e) {
    return {};
  }
};

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export async function get(url, config) {
  return await axiosApi
    .get(url, {
      ...config,
      headers: await getHeaders(),
    })
    .then(response => response.data);
}

export async function post(url, data, config, submissionUrl) {

  submissionUrl = submissionUrl || SERVER

  const baseUrl = axios.create({
    baseURL: submissionUrl,
    timeout: 50000,
  });

  let headers = { ...(await getHeaders()) };
  return await baseUrl
    .post(url, data, {
      ...config,
      headers: headers,
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error, "ytyt");
      return error
    });

}

// export async function postHeader(url, data, config) {
//   let headers = { ...(await getHeaders()) };
//   return await axiosApi
//     .post(url, data, {
//       ...config,
//       headers: headers,
//     })
//     .then(response => {
//       return response;
//     })
//     .catch(error => {
//       showToast('error', error.message)
//       console.log(error, "gggggg");
//     });
// }

export async function postHeader(url, data, config, baseUrlType) {
  // baseUrlType = baseUrlType || REACT_APP_APP_URL

  const baseUrl = axios.create({
    baseURL: baseUrlType,
  });

  let headers = { ...await getHeaders() }

  return await baseUrl
    .post(url, data, {
      ...config,
      headers: headers,
    })
    .then((response) => {
      return response
    })
    .catch(error => {
      showToast('error', error.message)
      console.log(error, "gggggg");
    });
}
