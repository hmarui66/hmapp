import 'es6-promise';
import 'isomorphic-fetch';
import qs from 'qs';

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};

const baseUrl = (process && process.title !== 'browser') ? `http://${clientConfig.host}:${clientConfig.port}/` : '/';

const baseOptions = {
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

export function fetchGet({ path, params = {}, context = {} }) {
  const method = 'GET';
  let url = baseUrl + path;
  if (Object.keys(params).length) {
    url += '?' + qs.stringify(params);
  }

  const options = { ...baseOptions, method };

  const { headers } = context;
  if (headers && headers.cookie) {
    options.headers = { ...options.headers, cookie: headers.cookie };
  }

  return fetch(url, options);
}

export function fetchPost(path, data) {
  const method = 'POST';
  let url = baseUrl + path;
  const body = JSON.stringify(data);

  return fetch(url, { ...baseOptions, body, method });
}

export function fetchDelete(path, data) {
  const method = 'DELETE';
  let url = baseUrl + path;
  const body = JSON.stringify(data);

  return fetch(url, { ...baseOptions, body, method });
}
