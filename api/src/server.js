const express = require('express');
const { installHandler } = require('./api_handler');
const { connectToDb } = require('./db');
require('dotenv').config();

const app = express();

installHandler(app);

const PORT = process.env.API_SERVER_PORT || process.env.PORT || 3000;

(async function start() {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`API server started on port : ${PORT}`);
    });
  } catch (error) {
    console.log('ERROR:', error);
  }
})();
