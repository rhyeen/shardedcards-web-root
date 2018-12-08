export const INTERFACE = {
  HTTP: 'http',
  MOCK: 'mock'
};

export const RUN_ENV = {
  LOCAL: 'local',
  PRODUCTION: 'prod'
};

export const interfaceState = () => {
  return INTERFACE.MOCK;
};

export const invalidInterfaceState = () => {
  return new Error(`Invalid interface state: ${interfaceState()}`);
}

export const runState = () => {
  return RUN_ENV.LOCAL;
}

export const baseEndpoint = () => {
  switch (runState()) {
    case RUN_ENV.LOCAL:
      return 'http://localhost:6250';
    case RUN_ENV.PRODUCTION:
      return '';
    default:
      return new Error(`Invalid run state: ${runState()}`);
  }
}