var UserProvider = require('../userprovider').UserProvider,
    Auth = require('../auth').Auth,
    userProvider = new UserProvider("localhost", 27017),
    auth = new Auth();


module.exports = function(app) { 

  /* index, new, create, show, edit, update */


  /*
   * GET /sessions/new
   * show the signup form
   */
  app.get('/sessions/new', function(req, res){
    res.render('sessions/new', { user: null });
  });

  /*
   * POST /sessions
   * find or create a user based on their handle
   */
  app.post('/sessions', function(req, res) {
    var handle = req.param('handle').replace("@", "");
    userProvider.findOrCreateByHandle(handle, function(err, user) {
      auth.login(res, user);
      res.redirect('/');
    });
  });


};