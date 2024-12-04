const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3001', 
            changeOrigin: true,
        })
    );

    app.use(
        '/signin',
        createProxyMiddleware({
            target: 'http://localhost:3001', 
            changeOrigin: true,
        })
    );

    app.use(
        '/signout',
        createProxyMiddleware({
            target: 'http://localhost:3001', 
            changeOrigin: true,
        })
    );

    app.use(
        '/myIdentity',
        createProxyMiddleware({
            target: 'http://localhost:3001', 
            changeOrigin: true,
        })
    );
};
