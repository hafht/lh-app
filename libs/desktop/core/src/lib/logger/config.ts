import { BuildEnv } from '@creative-force/cf-app-types';
export const ES_LOGGER_CONFIG = {
  prod: {
    endpoint: 'https://app-log.creativeforce.io/v1/aws/es/_bulk',
    key: '30VH2Rg4XaA3q06L5lCC11neSa0FiIAaH0ir6Y1',
  },
  uat: {
    endpoint: 'https://app-log.creativeforce-uat.io/v1/aws/es/_bulk',
    key: 'zD9Tf7XCk52JbW4WbABGq6F1qVXhiT5Q6UXqgWnT',
  },
  dev: {
    endpoint: 'https://app-log.creativeforce-dev.io/v1/aws/es/_bulk',
    key: 'zD9Tf7XCk52JbW4WbABGq6F1qVXhiT5Q6UXqgWnT',
  },
};

export const getEsLoggerConfig = (env: BuildEnv) => {
  switch (env) {
    case 'prod':
      return ES_LOGGER_CONFIG['prod'];
    case 'dev':
      return ES_LOGGER_CONFIG['dev'];
    case 'uat':
      return ES_LOGGER_CONFIG['uat'];
    default:
      return ES_LOGGER_CONFIG['dev'];
  }
};
