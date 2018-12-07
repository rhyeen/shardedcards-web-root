import { Log } from './logger.js';

export const CALLBACK_TIME = {
  POST: 200,
  GET: 200
};

export const Mock = {
  prepareResponse,
  debugRequest,
  debugSuccessfulResponse
};

function debugRequest(callFunction, requestData) {
  Log.debug(callFunction.name + ": REQUEST");
  if (requestData) {
    Log.debug(requestData);
  }
}

function debugSuccessfulResponse(callFunction, responseData) {
  Log.debug(callFunction.name + ": RESPONSE");
  if (responseData) {
    Log.debug(responseData);
  }
}

function prepareResponse(response) {
  return JSON.parse(JSON.stringify(response));
}