/**
 * Module Dependencies
 */
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var async = require('async');
var pg = require('pg').native;

var Waterline = require('waterline');

// Require Fixtures
var fixtures = {
  UserFixture: require('./fixtures/crud.fixture')
};

var loadTables = function(cb) {
  var userTable = fs.readFileSync(path.resolve(__dirname, './fixtures/userTable.sql'));

  pg.connect(Connections.test, function(err, client, done) {
    if (err) {
      cb(err);
      return;
    }
    client.query(userTable.toString('ascii'), function(err, result) {
      cb(err);
    });
  });

};


/////////////////////////////////////////////////////
// TEST SETUP
////////////////////////////////////////////////////

var waterline, ontology;

before(function(done) {

  loadTables(function(err) {
    if (err) {
      done(err);
      return;
    }

    waterline = new Waterline();

    Object.keys(fixtures).forEach(function(key) {
      waterline.loadCollection(fixtures[key]);
    });

    var connections = { sql: _.clone(Connections.test) };

    waterline.initialize({ adapters: { wl_tests: Adapter }, connections: connections }, function(err, _ontology) {
      if(err) return done(err);

      ontology = _ontology;

      Object.keys(_ontology.collections).forEach(function(key) {
        var globalName = key.charAt(0).toUpperCase() + key.slice(1);
        global.Sql[globalName] = _ontology.collections[key];
      });

      done();
    });
  });
});

after(function(done) {

  function dropCollection(item, next) {
    if(!Adapter.hasOwnProperty('drop')) return next();

    ontology.collections[item].drop(function(err) {
      if(err) return next(err);
      next();
    });
  }

  async.each(Object.keys(ontology.collections), dropCollection, function(err) {
    if(err) return done(err);
    waterline.teardown(done);
  });

});
