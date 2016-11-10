var bcrypt = require('bcryptjs'),
    Q = require('q'),
    config = require('./config.js'), //config file contains all tokens and other private info
    db = require('orchestrate')(config.db); //config.db holds Orchestrate token
var NUMBER_OF_CLASSES = 6;
//used in local-signup strategy
exports.localReg = function (username, password) {
  var deferred = Q.defer();
  var hash = bcrypt.hashSync(password, 8);
  var user = {
    "username": username,
    "password": hash,
    "avatar": "http://placepuppy.it/images/homepage/Beagle_puppy_6_weeks.JPG",
    "classes": []
  }
  //check if username is already assigned in our database
  db.get('local-users', username)
  .then(function (result){ //case in which user already exists in db
    console.log('username already exists');
    deferred.resolve(false); //username already exists
  })
  .fail(function (result) {//case in which user does not already exist in db
      console.log(result.body);
      if (result.body.message == 'The requested items could not be found.'){
        console.log('Username is free for use');
        db.put('local-users', username, user)
        .then(function () {
          console.log("USER: " + user);
          deferred.resolve(user);
        })
        .fail(function (err) {
          console.log("PUT FAIL:" + err.body);
          deferred.reject(new Error(err.body));
        });
      } else {
        deferred.reject(new Error(result.body));
      }
  });

  return deferred.promise;
};

//check if user exists
    //if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
      //if password matches take into website
  //if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (username, password) {
  var deferred = Q.defer();

  db.get('local-users', username)
  .then(function (result){
    console.log("FOUND USER");
    var hash = result.body.password;
    console.log(hash);
    console.log(bcrypt.compareSync(password, hash));
    if (bcrypt.compareSync(password, hash)) {
      deferred.resolve(result.body);
    } else {
      console.log("PASSWORDS NOT MATCH");
      deferred.resolve(false);
    }
  }).fail(function (err){
    if (err.body.message == 'The requested items could not be found.'){
          console.log("COULD NOT FIND USER IN DB FOR SIGNIN");
          deferred.resolve(false);
    } else {
      deferred.reject(new Error(err));
    }
  });

  return deferred.promise;
}

exports.getAllClasses = function() {
  var deferred = Q.defer();
  db.list('classes', {limit:NUMBER_OF_CLASSES})
  .then(function(result) {
    deferred.resolve(result.body.results);
  })
  .fail(function(err) {
    deferred.rejet(new Error(err));
  });
  return deferred.promise;
}

exports.getOwnClasses = function(username) {
  var deferred = Q.defer();
  db.get('local-users', username)
  .then(function(result) {
    deferred.resolve(result.body);
  })
  .fail(function (result){
    console.log(result);
    deferred.resolve(false);
  });

  return deferred.promise;
};

exports.addClass = function(username, password, classes) {
  var deferred = Q.defer();
  var user = {
    "username": username,
    "password": password,
    "avatar": "https://s-media-cache-ak0.pinimg.com/564x/3b/80/23/3b80233da0fccbc898f8b61a632b61ea.jpg",
    "classes": classes
  }
  db.get('local-users', username)
  .then(function (result) {
      console.log(result.body);
      if (result.body.message != 'The requested items could not be found.'){
        console.log('User is existing');
        db.put('local-users', username, user)
        .then(function () {
          console.log("USER: " + user);
          deferred.resolve(user);
        })
        .fail(function (err) {
          console.log("PUT FAIL:" + err.body);
          deferred.reject(new Error(err.body));
        });
      } else {
        deferred.reject(new Error(result.body));
      }
  })
  .fail(function (result){
    console.log('user fails to exist');
    deferred.resolve(false);
  });

  return deferred.promise;
};
