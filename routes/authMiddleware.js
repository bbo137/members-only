const boostrap = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401)
    .send(`<!DOCTYPE html><html><head><title>Not Logged In</title><link rel="stylesheet" href="${boostrap}"></head><body class="text-center"><div class="container"><h1 class="mt-5">You\'re Not Logged In</h1><p class="lead">Please log in to continue.</p><a href="/login" class="btn btn-primary">Login</a></div></body></html>`);
  }
};

module.exports.isMember = (req, res, next) => {
  if (req.user.isMember) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401)
    .send(`<!DOCTYPE html><html><head><title>No Permission</title><link rel="stylesheet" href="href="${boostrap}"></head><body class="text-center"><div class="container"><h1 class="mt-5">You Have No Permission to Do This</h1><p class="lead">You do not have the necessary permissions to perform this action.</p><a href="/" class="btn btn-primary">Go Back</a></div></body></html>`);
  }
};
