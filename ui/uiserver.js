require('dotenv').config();
const express = require('express');

const app = express();

const enableHMR = (process.env.ENABLE_HMR || 'true')  === 'true';

// Activer le hot module replacement en fonction du variable environement node
if(enableHMR && (process.env.NODE_ENV !== 'production')){
	console.log('Adding dev middleware, enabling HMR');
	const webpack = require('webpack');
	const devMiddleware = require('webpack-dev-middleware');
	const hotMiddleware = require('webpack-hot-middleware');
	
	/* Ajouter le module hot-middleware-replacement au fichier webpack.config.js
	si le variable d'environement node est différent de production */
	const config = require('./webpack.config.js');
	// Ajouter un element client dans le app qui se trouve dans entry  de webpack.config.js
	config.entry.app.push('webpack-hot-middleware/client');
	// initialisation Plugins
	config.plugins = config.plugins || [];
	// Ajouter une novelle instance de hotmoduleReplacement dans la partie plugins de webpack.confjs
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
	
	// Utliser le config comme paramètre dawebpack
	const compiler = webpack(config);
	app.use(devMiddleware(compiler));
	app.use(hotMiddleware(compiler));
	
	// il faut accepter hot module replacement dans le plus haut niveau des composantes, c'est à dire App.jsx
}
	app.use(express.static('public'));


const PORT = process.env.UI_SERVER_PORT || 8000;

app.listen(PORT, () => {
  console.log(`UI server start on port ${PORT}`);
});
