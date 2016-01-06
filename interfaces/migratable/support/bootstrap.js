/**
 * Module Dependencies
 */
var fs = require('fs');
var path = require('path');

var async = require('async');
var pg = require('pg');

var bootstrapFn = require('./bootstrapFn');

/////////////////////////////////////////////////////
// TEST SETUP
////////////////////////////////////////////////////

var waterline, ontology;

var loadTables = function(cb) {
  var userTable = fs.readFileSync(path.resolve(__dirname, './fixtures/userTable.sql'));
  var documentTable = fs.readFileSync(path.resolve(__dirname, './fixtures/documentTable.sql'));
  var dropTable = fs.readFileSync(path.resolve(__dirname, './fixtures/dropTable.sql'));

  pg.connect(Connections.test, function(err, client, done) {
    if (err) {
      cb(err);
      return;
    }
    client.query(userTable.toString('ascii'), function(err, result) {
      if (err) {
        cb(err);
        return;
      }
      client.query(dropTable.toString('ascii'), function(err, result) {
        if (err) {
          cb(err);
          return;
        }
        client.query(documentTable.toString('ascii'), function(err, result) {
          cb(err);
        });
      });
    });
  });

};

before(function(done) {

  loadTables(function(err) {
    if (err) {
      done(err);
      return;
    }
    bootstrapFn(function(err, obj) {
      if (err) {
        done(err);
        return;
      }

      ontology = obj.ontology;
      waterline = obj.waterline;

      Object.keys(ontology.collections).forEach(function(key) {
        var globalName = key.charAt(0).toUpperCase() + key.slice(1);
        global.Migratable[globalName] = ontology.collections[key];
      });

      // Store the Waterline object as a global so it can be used in the tests
      global.Migratable.waterline = waterline;

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
