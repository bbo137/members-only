require('dotenv').config();
const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.become_member_get = (req, res, next) => {
  res.render('index', {
    route: 'member',
    user: req.user ? req.user.name : 'none',
    isAuth: req.isAuthenticated(),
  });
};

exports.become_member_post = asyncHandler(async (req, res, next) => {
  if (process.env.MEMBER_SECRET === req.body.secretCode) {
    const user = await User.findById(req.user._id).exec();

    user.isMember = true;

    await user.save();
    res.redirect('/');
  } else {
    const errors = [{ msg: 'Wrong secretCode, try again!' }];
    res.render('index', {
      route: 'member',
      isAuth: req.isAuthenticated(),
      errors: errors,
    });
  }
});

exports.become_admin_get = (req, res, next) => {
  res.render('index', {
    route: 'admin',
    user: req.user ? req.user.name : 'none',
    isAuth: req.isAuthenticated(),
  });
};

exports.become_admin_post = asyncHandler(async (req, res, next) => {
  if (process.env.ADMIN_SECRET === req.body.adminCode) {
    const user = await User.findById(req.user._id).exec();

    user.isMember = true;
    user.isAdmin = true;

    await user.save();
    res.redirect('/');
  } else {
    const errors = [{ msg: 'Wrong adminCode, try again!' }];
    res.render('index', {
      route: 'admin',
      user: req.user ? req.user.name : 'none',
      isAuth: req.isAuthenticated(),
      errors: errors,
    });
  }
});
