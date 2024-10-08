export const AccountApiConfig = {
  'debug': {
    cfAccountUrl: 'https://accounts.creativeforce-dev.io',
    authorizationEndpoint: 'https://accounts.creativeforce-dev.io/connect/authorize',
    tokenEndpoint: 'https://accounts.creativeforce-dev.io/connect/token',
    revokeTokenEndpoint: 'https://accounts.creativeforce-dev.io/connect/revocation',
  },
  'dev': {
    cfAccountUrl: 'https://accounts.creativeforce-dev.io',
    authorizationEndpoint: 'https://accounts.creativeforce-dev.io/connect/authorize',
    tokenEndpoint: 'https://accounts.creativeforce-dev.io/connect/token',
    revokeTokenEndpoint: 'https://accounts.creativeforce-dev.io/connect/revocation',
  },
  'uat': {
    cfAccountUrl: 'https://accounts.creativeforce-uat.io',
    authorizationEndpoint: 'https://accounts.creativeforce-uat.io/connect/authorize',
    tokenEndpoint: 'https://accounts.creativeforce-uat.io/connect/token',
    revokeTokenEndpoint: 'https://accounts.creativeforce-dev.io/connect/revocation',
  },
  'prod': {
    cfAccountUrl: 'https://accounts.creativeforce.io',
    authorizationEndpoint: 'https://accounts.creativeforce.io/connect/authorize',
    tokenEndpoint: 'https://accounts.creativeforce.io/connect/token',
    revokeTokenEndpoint: 'https://accounts.creativeforce.io/connect/revocation',
  }
}
