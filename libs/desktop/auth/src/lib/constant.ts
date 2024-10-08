export const SERVER_SETTING = {
  host: '127.0.0.1',
  basePort: 3000, // dev env
  port: 0,
};

export const CLIENT_IDS = {
  kelvin: 'kelvin',
  hue: 'hue',
  ink: 'ink',
  luma: 'luma'
};

export const BUILD_ENVS = {
  test: 'test', // only use in lh-packages
  debug: 'debug',
  dev: 'dev',
  uat: 'uat',
  prod: 'prod',
};


export const VIEW_CONTENT = {
  'success': {
    pageTitle: 'Creative Force',
    authTextStatus: 'Login successful!',
    authTextMessage: 'You can close this browser tab and go back to your application.'
  },
  'error': {
    pageTitle: 'Creative Force',
    authTextStatus: 'Couldn’t sign in!',
    authTextMessage: 'We’re having trouble signing you in. Try again on the desktop app.'
  }
}
