const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*'); //[process.env.CLIENT_HOST + ':' + process.env.CLIENT_PORT]);
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(`/pokebattlemon/fileserver/api/${process.env.API_VERSION}`, indexRouter);

module.exports = app;
