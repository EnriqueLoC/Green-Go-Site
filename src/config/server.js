const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'tu cookie',
    resave: false,
    saveUninitialized: true
}));
app.use((req, res, next) => {
    console.log('Session:', req.session);
    next();
  });
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    next();
  });

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../app/views')));

module.exports = app;