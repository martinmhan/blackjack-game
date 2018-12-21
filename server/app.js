const express = require('express');
const parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const router = require('./router.js');

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/api', router);

module.exports = app;
