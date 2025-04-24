const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/nasa-api',
    createProxyMiddleware({
      target: 'https://osdr.nasa.gov', // NASA API base URL
      changeOrigin: true, // Allows proxying requests to a different origin
      pathRewrite: { '^/nasa-api': '' }, // Rewrites /nasa-api to the target URL
      secure: false, // Set to false if the target server has self-signed SSL
    }),
  );
};
