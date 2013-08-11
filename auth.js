var auth = function(){};

auth.prototype.isLoggedIn = function(req) {
  return req.cookies.userId;
};

auth.prototype.userId = function(req) {
  return req.cookies.userId;
}

auth.prototype.login = function(res, user) {
  console.log(user);
  res.cookie('userId', user._id);
};

exports.Auth = auth;