const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  '/',
  expressStaticGzip(path.join(__dirname, '/dist'), {
    enableBrotli: true,
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
