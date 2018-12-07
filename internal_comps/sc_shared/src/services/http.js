import { BaseEndpoint } from './interface-state.js';

export const HTTP_REQUEST = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

export const Http = {
  post: baseHttpPost,
  get: baseHttpGet
};

function baseHttpPost(endpoint, bodyData) {
  return httpJsonRequest(`${BaseEndpoint}/${endpoint}`, HTTP_REQUEST.POST, bodyData);
}

function baseHttpGet(endpoint) {
  return httpJsonRequest(`${BaseEndpoint}/${endpoint}`, HTTP_REQUEST.GET);
}

export const DefaultJsonHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
}

function httpJsonRequest(url, request, bodyData) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: request,
      headers: DefaultJsonHeaders(),
      body: JSON.stringify(bodyData)
    })
    .then(res => resolve(res.json()))
    .catch(err => reject(err))
  });
}