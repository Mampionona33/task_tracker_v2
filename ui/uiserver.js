require('dotenv').config();
const express = require('express');

const app = express();
const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';

app.use(express.static('public'));

const port = process.env.UI_SERVER_PORT || 8000;

app.listen(port, () => {
  console.log(`UI server started on port ${port}`);
});
