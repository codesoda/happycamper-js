var Auth = require('../auth').Auth,
    auth = new Auth(),
    User = require('../userprovider').User,
    PlaceProvider = require('../placeprovider').PlaceProvider,
    placeProvider = new PlaceProvider("localhost", 27017),
    async = require('async');

module.exports = function(app) {

  /*
   * GET home page.
   */
  app.get("/", function(req, res, next){
    if (auth.isLoggedIn(req)) {
      var userId = auth.userId(req);

      async.parallel([
        function(callback) {
          User.findById(userId, function(err, user) {
            callback(err, user);
          });
        },
        function(callback) {
          placeProvider.findAll(function(err, places) {
            callback(err, places);
          });
        }
      ], function(err, results) {
        if (err) next();
        else res.render('index', { user: results[0], places: results[1] });
      });

    } else {
      res.redirect('/sessions/new');
    }
  });

}