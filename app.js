require('dotenv').config();


const port = process.env.PORT || 3000;
const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const routes = require('./routes/index');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MongoDB options
const MONGO_DB_URL = process.env.MONGODB_URL;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_DB_URL);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sessionStore = MongoStore.create({
  mongoUrl: MONGO_DB_URL,
  dbName: 'members-only',
  collectionName: 'sessions',
});

app.use(
  session({
    secret: process.env.SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

require('./config/passport');

app.use(passport.session());

app.use(routes);

app.listen(port, "0.0.0.0", () =>   console.log(`Server is running on port ${port}`));
