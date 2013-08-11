var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var placeProvider = function(host, port) {
  this.db= new Db('happycamper', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
}

placeProvider.prototype.getCollection= function(callback) {
  this.db.collection('places', function(error, places_collection) {
  if( error ) callback(error);
  else callback(null, places_collection);
  });
};

// find all places
placeProvider.prototype.findAll = function(callback) {
  this.getCollection(function(error, place_collection) {
    if( error ) callback(error)
    else {
      place_collection.find().toArray(function(error, results) {
        if( error ) callback(error)
        else callback(null, results)
      });
    }
  });
};

//save new place
placeProvider.prototype.save = function(places, callback) {
  this.getCollection(function(error, place_collection) {
    if( error ) callback(error)
    else {
      if( typeof(places.length)=="undefined")
      places = [places];

      for( var i =0;i< places.length;i++ ) {
        place = places[i];
        place.created_at = new Date();
      }

      place_collection.insert(places, function() {
        callback(null, places);
      });
    }
  });
};

// find a place by handle
placeProvider.prototype.findOrCreateByHandle = function(handle, callback) {
  this.getCollection(function(error, place_collection) {
    if( error ) callback(error)
    else {
      place_collection.insert({handle: handle}, function(error, places) {
        if( error ) callback(error)
        else callback(null, places[0])
      });
    }
  });
};

// find a place by id
placeProvider.prototype.findById = function(id, callback) {
  this.getCollection(function(error, place_collection) {
    if( error ) callback(error)
    else {
      place_collection.findOne({_id: place_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
        if( error ) callback(error)
        else callback(null, result)
      });
    }
  });
};

placeProvider.prototype.update = function(placeId, places, callback) {
  this.getCollection(function(error, place_collection) {
    if( error ) callback(error);
    else {
      place_collection.update(
        {_id: place_collection.db.bson_serializer.ObjectID.createFromHexString(placeId)},
        places,
        function(error, places) {
          if(error) callback(error);
          else callback(null, places)       
        });
    }
  });
};

exports.PlaceProvider = placeProvider;
