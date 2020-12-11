//index.js
var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

const createUser = httpProxy(' http://127.0.0.1:3333/users');
const loginUser = httpProxy(' http://127.0.0.1:3333/sessions');

// Proxy request
app.post('/users', (req, res, next) => {
  createUser(req, res, next);
})

app.post('/auth', (req, res, next) => {
  loginUser(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000, () => {
  console.log('API GATEWAY ON');
});