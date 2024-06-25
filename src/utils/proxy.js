const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = createProxyMiddleware({
    target: 'http://localhost:5173/',
    changeOrigin: true
})