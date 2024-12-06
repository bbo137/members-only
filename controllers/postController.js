const User = require('../models/user');
const Message = require('../models/message');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.post_home = asyncHandler(async (req, res, next) => {
  const AllMessages = await Message.find({})
    .populate({ path: 'user', select: 'first_name family_name' })
    .sort({ timestamp: -1 })
    .exec();

  res.render('index', {
    route: 'home',
    message_list: AllMessages,
    isAuth: req.isAuthenticated(),
    isAdmin: req.isAuthenticated() && req.user.isAdmin,
    isMember: req.isAuthenticated() && req.user.isMember,
    user: req.user ? req.user.name : 'none',
  });
});

exports.post_message_get = asyncHandler(async (req, res, next) => {
  res.render('index', { route: 'post-message', 
    isAuth: req.isAuthenticated(),
    user: req.user ? req.user.name : 'none', });
});

exports.post_message_post = [
  body('title', 'Title length must be between 3 and 100 characters')
    .isLength({ min: 2, max: 100 })
    .escape(),
  body('message', 'Post length must be between 4 and 4000 characters.')
    .isLength({ min: 4, max: 4000 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      user: req.user._id,
      title: req.body.title,
      message: req.body.message,
      timestamp: Date.now(),
    });

    if (!errors.isEmpty()) {
      res.render('index', {
        route: 'post-message',
        isAuth: req.isAuthenticated(),
        message: message,
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect('/');
    }
  }),
];

exports.delete_post = asyncHandler(async (req, res, next) => {
  await Message.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
  res.redirect('/');
});
