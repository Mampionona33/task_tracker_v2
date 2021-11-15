require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.static('public'));

const PORT = process.env.UI_SERVER_PORT || 8000;

app.listen(PORT, () => {
  console.log(`UI server start on port ${PORT}`);
});
