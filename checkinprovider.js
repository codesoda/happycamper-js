var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var checkinProvider = function(host, port) {
  this.db= new Db('happycamper', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
}

checkinProvider.prototype.getCollection= function(callback) {
  this.db.collection('checkins', function(error, checkins_collection) {
  if( error ) callback(error);
  else callback(null, checkins_collection);
  });
};

// find all checkins
checkinProvider.prototype.findAll = function(callback) {
  this.getCollection(function(error, checkin_collection) {
    if( error ) callback(error)
    else {
      checkin_collection.find().toArray(function(error, results) {
        if( error ) callback(error)
        else callback(null, results)
      });
    }
  });
};

//save new checkin
checkinProvider.prototype.save = function(checkins, callback) {
  this.getCollection(function(error, checkin_collection) {
    if( error ) callback(error)
    else {
      if( typeof(checkins.length)=="undefined")
      checkins = [checkins];

      for( var i =0;i< checkins.length;i++ ) {
        checkin = checkins[i];
        checkin.created_at = new Date();
      }

      checkin_collection.insert(checkins, function() {
        callback(null, checkins);
      });
    }
  });
};

// find a checkin by handle
checkinProvider.prototype.findOrCreateByHandle = function(handle, callback) {
  this.getCollection(function(error, checkin_collection) {
    if( error ) callback(error)
    else {
      checkin_collection.insert({handle: handle}, function(error, checkins) {
        if( error ) callback(error)
        else callback(null, checkins[0])
      });
    }
  });
};

// find a checkin by id
checkinProvider.prototype.findById = function(id, callback) {
  this.getCollection(function(error, checkin_collection) {
    if( error ) callback(error)
    else {
      checkin_collection.findOne({_id: checkin_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
        if( error ) callback(error)
        else callback(null, result)
      });
    }
  });
};

checkinProvider.prototype.update = function(checkinId, checkins, callback) {
  this.getCollection(function(error, checkin_collection) {
    if( error ) callback(error);
    else {
      checkin_collection.update(
        {_id: checkin_collection.db.bson_serializer.ObjectID.createFromHexString(checkinId)},
        checkins,
        function(error, checkins) {
          if(error) callback(error);
          else callback(null, checkins)       
        });
    }
  });
};

exports.CheckinProvider = checkinProvider;
