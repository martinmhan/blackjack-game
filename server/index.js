const app = require('./app.js');
require('dotenv').config();

const PORT = process.env.PORT || 9001;

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error connecting to port: ', PORT);
  } else {
    console.log('Successfully connected to port: ', PORT);
  }
});