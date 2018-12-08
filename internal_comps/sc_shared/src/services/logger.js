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
  if (logLevel() === DEBUG) {
    console.log(message);
  }
}

function logInfo(message) {
  if (logLevel() === DEBUG || logLevel() === INFO) {
    console.log(message);
  }
}

function logError(message) {
  console.error(message);
}