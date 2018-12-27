const app = require('./app.js');
require('dotenv').config();

const PORT = process.env.PORT || 9001;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port: ', PORT);
  }
});
