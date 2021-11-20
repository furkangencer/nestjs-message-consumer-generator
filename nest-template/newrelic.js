const {
  NEW_RELIC_APP_NAME: appName,
  NEW_RELIC_ENABLED: enabled,
  NEW_RELIC_LICENSE_KEY: licenseKey,
  NEW_RELIC_VERSION: version,
  npm_package_name: packageName,
  npm_package_version: packageVersion,
} = process.env;

exports.config = {
  app_name: [appName || packageName],
  license_key: licenseKey,
  agent_enabled: enabled === 'true',
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*',
    ],
  },

  logging: {
    level: 'info',
  },
  labels: {
    version: version || packageVersion,
  },
};
