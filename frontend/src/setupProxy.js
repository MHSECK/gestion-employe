// Redirige les appels /api du serveur React vers le backend FastAPI
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: process.env.API_PROXY_TARGET || 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};
