// Modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');

// Add config to global.global
const config = require('./config');
global.appConfig = config;

// Add lowdb as database to global.global
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
global.appDB = lowdb(adapter);
global.appDB.defaults({ users: [{username: 'admin', password: '$2a$10$SjPAMA9Ls/f0cM9e0aPGReZpmcmloptwWushd1Z9yW2iPGBAulmRi'}] }).write()

// Routers
const fileRouter = require('./routes/file');
const userRouter = require('./routes/user');

// Policies
const policy = require('./policy');

const app = express();

// Add session for login
redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});
app.use(session({
  secret: global.appConfig.sessionSecret,
  name: 'fmauth',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/u', userRouter);
app.use(policy)
app.use('/b', fileRouter);
// app.use('/', function(req, res, next) {
//   return res.redirect('/b');
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (err.status === 404) {
    return res.status(404).render('404', {path: req.url})
  } else {
    console.log(err)
    return res.status(err.status || 500).render('500', {})
  }
});

module.exports = app;
