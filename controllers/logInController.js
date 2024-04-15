const User = require('../models/user');
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.log_in_get = asyncHandler(async (req, res, next) => {
  res.render('index', { route: 'log-in', isAuth: req.isAuthenticated(),});
});

exports.log_in_post = asyncHandler(async (req, res, next) => {
  res.redirect('/');
});
