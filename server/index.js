const app = require('./app.js');

const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error connecting to port: ', PORT);
  } else {
    console.log('Successfully connected to port: ', PORT);
  }
});