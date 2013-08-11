var PlaceProvider = require('../placeprovider').PlaceProvider,
    placeProvider = new PlaceProvider("localhost", 27017);

module.exports = function(app) { 

  /*
   * GET /places listing
   */
  app.get('/places', function(req, res){
    placeProvider.findAll(function(err, places) {
      res.send(places);
    });
  });

};