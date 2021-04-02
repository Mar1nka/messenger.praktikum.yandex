// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const PORT = 3002;

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('/*', (req, res) => {
  res.sendFile('./dist/index.html', { root: __dirname });
});

app.listen(PORT, () => console.log(`Local app listening on port ${PORT}'`));
