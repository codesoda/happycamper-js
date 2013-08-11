var CheckinProvider = require('../checkinprovider').CheckinProvider,
    checkinProvider = new CheckinProvider("localhost", 27017),
    UserProvider = require('../userprovider').UserProvider,
    userProvider = new UserProvider("localhost", 27017),
    Auth = require('../auth').Auth,
    auth = new Auth();


module.exports = function(app) { 

  /* index, new, create, show, edit, update */


  /*
   * GET /checkins listing
   */
  app.get('/checkins', function(req, res){
    checkinProvider.findAll(function(err, checkins) {
      res.send(checkins);
    });
  });

  app.post("/checkins", function(req, res) {
    var userId = auth.userId(req);
    var user = userProvider.findById(userId, function(err, user) {

      var place_id = req.param('place_id');
      var place_name = req.param('place_name');

      var addCheckin = function(place) {
        var ch = {
          place: place,
          description: req.param('description'),
          user_id: userId,
          user: user
        };
        checkinProvider.save(ch, function(err, checkins) {
          res.send(checkins[0]);
        });
      };

      if (place_id) {
        placeProvider.findById(place_id, function(err, place) {
          addCheckin(place);
        });
      } else {
        placeProvider.save({ name: place_name }, function(err, place) {
          addCheckin(place[0]); 
        });
      }

    });
  });

};