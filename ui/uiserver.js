require('dotenv').config();
const express = require('express');

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

const port = process.env.UI_SERVER_PORT || 8000;

app.listen(port, () => {
  console.log(`UI server started on port ${port}`);
});
