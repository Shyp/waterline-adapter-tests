/**
 * Module Dependencies
 */
var fs = require('fs');
var path = require('path');

var Waterline = require('waterline');

var _ = require('lodash');
var async = require('async');
var pg = require('pg');

// Require Fixtures
var fixtures = {
  PaymentBelongsFixture: require('./fixtures/belongsTo.child.fixture'),
  PaymentBelongsCustomFixture: require('./fixtures/belongsTo.child.customPK.fixture'),
  CustomerBelongsFixture: require('./fixtures/belongsTo.parent.fixture'),
  CustomerBelongsCustomFixture: require('./fixtures/belongsTo.parent.customPK.fixture'),
  PaymentHasManyFixture: require('./fixtures/hasMany.child.fixture'),
  CustomerHasManyFixture: require('./fixtures/hasMany.parent.fixture'),
  ApartmentHasManyFixture: require('./fixtures/hasMany.customPK.fixture'),
  PaymentManyFixture: require('./fixtures/multipleAssociations.fixture').payment,
  CustomerManyFixture: require('./fixtures/multipleAssociations.fixture').customer,
  UserOneFixture: require('./fixtures/oneToOne.fixture').user_resource,
  ProfileOneFixture: require('./fixtures/oneToOne.fixture').profile
};

var loadTables = function(cb) {
  var apartmentTable = fs.readFileSync(path.resolve(__dirname, './fixtures/apartmentTable.sql'));
  var customerTable = fs.readFileSync(path.resolve(__dirname, './fixtures/customerTable.sql'));
  var customer_manyTable = fs.readFileSync(path.resolve(__dirname, './fixtures/customer_manyTable.sql'));
  var customerbelongsPKTable = fs.readFileSync(path.resolve(__dirname, './fixtures/customerbelongsPKTable.sql'));
  var customerbelongsTable = fs.readFileSync(path.resolve(__dirname, './fixtures/customerbelongsTable.sql'));
  var paymentBelongsTable = fs.readFileSync(path.resolve(__dirname, './fixtures/paymentBelongsTable.sql'));
  var paymentTable = fs.readFileSync(path.resolve(__dirname, './fixtures/paymentTable.sql'));
  var payment_manyTable = fs.readFileSync(path.resolve(__dirname, './fixtures/payment_manyTable.sql'));
  var paymentbelongsPKTable = fs.readFileSync(path.resolve(__dirname, './fixtures/paymentbelongsPKTable.sql'));
  var profileTable = fs.readFileSync(path.resolve(__dirname, './fixtures/profileTable.sql'));
  var user_resourceTable = fs.readFileSync(path.resolve(__dirname, './fixtures/user_resourceTable.sql'));

  // hi haters
  pg.connect(Connections.test, function(err, client, done) {
    if (err) {
      cb(err);
      return;
    }
    async.map([apartmentTable, customerTable, customer_manyTable,
      customerbelongsPKTable, customerbelongsTable, paymentBelongsTable,
      paymentTable, payment_manyTable, paymentbelongsPKTable, profileTable,
      user_resourceTable], function(sql, next) {
        client.query(sql.toString('ascii'), next);
      }, cb);
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

    var connections = { associations: _.clone(Connections.test) };

    waterline.initialize({ adapters: { wl_tests: Adapter }, connections: connections }, function(err, _ontology) {
      if(err) return done(err);

      ontology = _ontology;

      Object.keys(_ontology.collections).forEach(function(key) {
        var globalName = key.charAt(0).toUpperCase() + key.slice(1);
        global.Associations[globalName] = _ontology.collections[key];
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
