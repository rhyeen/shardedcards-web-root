export const LOG_LEVEL = {
  DEBUG: 'debug',
  INFO: 'info',
  ERROR: 'error'
};

export const logLevel = () => {
  return LOG_LEVEL.DEBUG;
}

export const Log = {
  debug: logDebug,
  info: logInfo,
  error: logError
}

function logDebug(message) {
  if (logLevel() === LOG_LEVEL.DEBUG) {
    console.log(_freezeMessage(message));
  }
}

function logInfo(message) {
  if (logLevel() === LOG_LEVEL.DEBUG || logLevel() === LOG_LEVEL.INFO) {
    console.log(_freezeMessage(message));
  }
}

function logError(message) {
  console.error(_freezeMessage(message));
}

function _freezeMessage(message) {
  return JSON.parse(JSON.stringify(message));
}