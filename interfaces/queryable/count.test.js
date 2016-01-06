var assert = require('assert'),
    _ = require('lodash');

describe('Queryable Interface', function() {

  describe('count()', function() {

    /////////////////////////////////////////////////////
    // TEST SETUP
    ////////////////////////////////////////////////////

    // Start with an known database state to accurately test count
    before(function(done) {
      Queryable.User.destroy(function(err) {
        if(err) return done(err);

        // Insert 10 Users
        var users = [];
        for(var i=0; i<10; i++) {
          users.push({first_name: 'count_user' + i, type: 'count'});
        }

        Queryable.User.createEach(users, function(err, users) {
          if(err) return done(err);
          done();
        });
      });
    });

    /////////////////////////////////////////////////////
    // TEST METHODS
    ////////////////////////////////////////////////////

    it('should return an error when counting', function(done) {
      Queryable.User.count({ type: 'count' }, function(err, count) {
        assert.strictEqual(err.message, 'count() is unsupported');
        done();
      });
    });
  });
});
