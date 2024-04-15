const User = require('../models/user');
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('index', { route: 'sign-up', isAuth: req.isAuthenticated(), });
});

exports.sign_up_post = [
  body('first_name', 'First name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('family_name', 'Family name must not be empty.')
    .isLength({ min: 1 })
    .escape(),
  body('username', 'Username must have 6 characters.')
    .trim()
    .isLength({ min: 6 })
    .matches(/^[a-zA-Z0-9_]+$/, 'i')
    .escape(),
  body('username').custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
      throw new Error('Username already in use');
    }
  }),
  body('password', 'Password must have  6 characters')
    .isLength({ min: 5 })
    .escape(),
  body('password_confirm', 'Passwords must match.').custom((value, { req }) => {
    return value === req.body.password;
  }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        const user = new User({
          first_name: req.body.first_name,
          family_name: req.body.family_name,
          username: req.body.username,
          password_hash: hashedPassword,
          isAdmin: false,
          isMember: false,
        });

        if (!errors.isEmpty()) {
          res.render('index', {
            route: 'sign-up',
            isAuth: req.isAuthenticated(),
            user: user,
            errors: errors.array(),
          });
        } else {
          await user.save();
          res.redirect('/');
        }
      }
    });
  }),
];
