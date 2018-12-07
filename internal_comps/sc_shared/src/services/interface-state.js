export const INTERFACE = {
  HTTP: 'http',
  MOCK: 'mock'
};

export const RUN_ENV = {
  LOCAL: 'local',
  PRODUCTION: 'prod'
};

export const InterfaceState = () => {
  return INTERFACE.MOCK;
};

export const InvalidInterfaceState = () => {
  return new Error(`Invalid interface state: ${InterfaceState()}`);
}

export const RunState = () => {
  return RUN_ENV.LOCAL;
}

export const BaseEndpoint = () => {
  switch (RunState()) {
    case RUN_ENV.LOCAL:
      return 'http://localhost:6250';
    case RUN_ENV.PRODUCTION:
      return '';
    default:
      return new Error(`Invalid run state: ${RunState()}`);
  }
}