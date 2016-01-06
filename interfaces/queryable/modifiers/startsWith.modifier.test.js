var assert = require('assert'),
    _ = require('lodash');

describe('Queryable Interface', function() {

  describe('Modifiers', function() {
    describe('startsWith', function() {

      describe('shorthand', function() {

        /////////////////////////////////////////////////////
        // TEST METHODS
        ////////////////////////////////////////////////////

        it('should return the user with the correct name', function(done) {
          var part = 'short_xxj8xrxh!!!r',
              testName = 'short_xxj8xrxh!!!r startsWith query test';

          Queryable.User.create({ first_name: testName }, function(err) {
            if (err) return done(err);

            Queryable.User.startsWith({ first_name: part }, function(err, users) {
              assert(!err);
              assert(Array.isArray(users));
              assert.equal(users.length, 1);
              assert.equal(users[0].first_name, testName);
              done();
            });
          });
        });
      });

      describe('full where criteria', function() {

        /////////////////////////////////////////////////////
        // TEST METHODS
        ////////////////////////////////////////////////////

        it('should return the user with the correct name', function(done) {
          var part = 'long_xxj8xrxh!!!r',
              testName = 'long_xxj8xrxh!!!r startsWith query test';

          Queryable.User.create({ first_name: testName }, function(err) {
            if (err) return done(err);

            Queryable.User.where({ first_name: { startsWith: part }}, function(err, users) {
              assert(!err);
              assert(Array.isArray(users));
              assert.equal(users.length, 1);
              assert.equal(users[0].first_name, testName);
              done();
            });
          });
        });
      });

    });
  });
});
