var UserProvider = require('../userprovider').UserProvider;
var userProvider = new UserProvider("localhost", 27017);

module.exports = function(app) { 

  /*
   * GET users listing.
   */
  app.get('/users', function(req, res){
    userProvider.findAll(function(err, users){
      res.send(users);
    });
  });

};