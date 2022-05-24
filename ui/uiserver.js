require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';

if (enableHMR && process.env.NODE_ENV !== 'production') {
  console.log('Adding dev middlware, enabling HMR');
  /* eslint "global-require": "off" */
  /* eslint "import/no-extraneous-dependencies": "off" */
  const webpack = require('webpack');
  const devMiddlware = require('webpack-dev-middleware');
  const hotMiddlware = require('webpack-hot-middleware');

  const config = require('./webpack.config');
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  console.log(config);
  const compiler = webpack(config);
  app.use(devMiddlware(compiler));
  app.use(hotMiddlware(compiler));
}

app.use(express.static('public'));

const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
  app.use(
    '/graphql',
    createProxyMiddleware({ target: apiProxyTarget, changeOrigin: true })
  );
}

// sending endpoint env to process.env
const UI_API_ENDPOINT =
  process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});
const serverPort = 8000;

const PORT = process.env.PORT || process.env.UI_SERVER_PORT || serverPort;

app.listen(PORT, () => {
  console.log(`UI server started on port ${PORT}`);
});
