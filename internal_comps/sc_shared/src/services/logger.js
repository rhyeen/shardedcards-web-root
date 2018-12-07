export const LOG_LEVEL = {
  DEBUG: 'debug',
  INFO: 'info',
  ERROR: 'error'
};

export const LogLevel = () => {
  return LOG_LEVEL.DEBUG;
}

export const Log = {
  debug: logDebug,
  info: logInfo,
  error: logError
}

function logDebug(message) {
  if (LogLevel() === DEBUG) {
    console.log(message);
  }
}

function logInfo(message) {
  if (LogLevel() === DEBUG || LogLevel() === INFO) {
    console.log(message);
  }
}

function logError(message) {
  console.error(message);
}