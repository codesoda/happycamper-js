var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/happycamper');

var userSchema = mongoose.Schema({
  name: String
});

var User = mongoose.model('User', userSchema);
exports.User = User;

/*
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var userProvider = function(host, port) {
  this.db= new Db('happycamper', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
}

userProvider.prototype.getCollection= function(callback) {
  this.db.collection('users', function(error, users_collection) {
  if( error ) callback(error);
  else callback(null, users_collection);
  });
};

// find all Users
userProvider.prototype.findAll = function(callback) {
  this.getCollection(function(error, user_collection) {
    if( error ) callback(error)
    else {
      user_collection.find().toArray(function(error, results) {
        if( error ) callback(error)
        else callback(null, results)
      });
    }
  });
};

//save new User
userProvider.prototype.save = function(users, callback) {
  this.getCollection(function(error, user_collection) {
    if( error ) callback(error)
    else {
      if( typeof(users.length)=="undefined")
      users = [users];

      for( var i =0;i< users.length;i++ ) {
        user = users[i];
        user.created_at = new Date();
      }

      user_collection.insert(users, function() {
        callback(null, users);
      });
    }
  });
};

// find a user by handle
userProvider.prototype.findOrCreateByHandle = function(handle, callback) {
  this.getCollection(function(error, user_collection) {
    if( error ) callback(error)
    else {
      user_collection.insert({handle: handle}, function(error, users) {
        if( error ) callback(error)
        else callback(null, users[0])
      });
    }
  });
};

// find a user by id
userProvider.prototype.findById = function(id, callback) {
  this.getCollection(function(error, user_collection) {
    if( error ) callback(error)
    else {
      user_collection.findOne({_id: user_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
        if( error ) callback(error)
        else callback(null, result)
      });
    }
  });
};

userProvider.prototype.update = function(userId, users, callback) {
  this.getCollection(function(error, user_collection) {
    if( error ) callback(error);
    else {
      user_collection.update(
        {_id: user_collection.db.bson_serializer.ObjectID.createFromHexString(userId)},
        users,
        function(error, users) {
          if(error) callback(error);
          else callback(null, users)       
        });
    }
  });
};

exports.UserProvider = userProvider;
*/
