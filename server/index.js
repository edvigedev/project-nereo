const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // 1. ISS proxy — must come first and be most specific!
  app.use(
    '/iss-proxy',
    createProxyMiddleware({
      target: 'http://api.open-notify.org',
      changeOrigin: true,
      pathRewrite: { '^/iss-proxy': '' },
      secure: false,
      logLevel: 'debug',
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader('user-agent', 'curl/7.68.0');
        proxyReq.setHeader('accept', '*/*');
        proxyReq.removeHeader && proxyReq.removeHeader('accept-encoding');
        proxyReq.setHeader('host', 'api.open-notify.org');
      },
    }),
  );

  // 2. NASA missions proxy — catches everything else!
  app.use(
    '/nasa-api',
    createProxyMiddleware({
      target: 'https://osdr.nasa.gov',
      changeOrigin: true,
      pathRewrite: { '^/nasa-api': '' },
      secure: false,
      logLevel: 'debug',
    }),
  );
};
