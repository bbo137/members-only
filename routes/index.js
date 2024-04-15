const express = require('express');
const router = express.Router();

// Require controller modules
const sign_up_controller = require('../controllers/signUpController');
const log_in_controller = require('../controllers/logInController');
const postController = require('../controllers/postController');
const statusController = require('../controllers/statusController');
const passport = require('passport');

const asyncHandler = require('express-async-handler');

const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

// Routes

router.get('/', postController.post_home);

router.get('/post-message', isAuth, postController.post_message_get);

router.post('/post-message', isAuth, postController.post_message_post);

router.post('/delete-post/:id', isAdmin, postController.delete_post);

router.get('/member', isAuth, statusController.become_member_get);

router.post('/member', isAuth, statusController.become_member_post);

router.get('/admin', isAuth, statusController.become_admin_get);

router.post('/admin', isAuth, statusController.become_admin_post);

router.get('/sign-up', sign_up_controller.sign_up_get);

router.post('/sign-up', sign_up_controller.sign_up_post);

router.get('/log-in', log_in_controller.log_in_get);

router.post(
  '/log-in',
  passport.authenticate('local'),
  log_in_controller.log_in_post
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
