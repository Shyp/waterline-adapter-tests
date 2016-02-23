var assert = require('assert'),
    _ = require('lodash');

describe('Queryable Interface', function() {

  describe('Modifiers', function() {
    describe('endsWith', function() {
      describe('shorthand', function() {

        /////////////////////////////////////////////////////
        // TEST METHODS
        ////////////////////////////////////////////////////

        it('should return the user with the correct name', function(done) {
          var part = 'xxj8xa4hPFDH_short',
              testName = 'endsWith query test xxj8xa4hPFDH_short';

          Queryable.User.create({ first_name: testName }, function(err) {
            if(err) return done(err);

            Queryable.User.endsWith({ first_name: part }, function(err, users) {
              assert.ifError(err);
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
          var part = 'xxj8xa4hPFDH_long',
              testName = 'endsWith query test xxj8xa4hPFDH_long';

          Queryable.User.create({ first_name: testName }, function(err) {
            if(err) return done(err);

            Queryable.User.where({ first_name: { endsWith: part }}, function(err, users) {
              assert.ifError(err);
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
