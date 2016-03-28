var assert = require('assert'),
    _ = require('lodash');

describe('Semantic Interface', function() {

  describe('.destroy()', function() {

    describe('a single record', function() {

      /////////////////////////////////////////////////////
      // TEST SETUP
      ////////////////////////////////////////////////////

      before(function(done) {
        Semantic.Usertable.create({ first_name: 'Destroy', last_name: 'Test' }, function(err) {
          if(err) return done(err);
          done();
        });
      });

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should destroy a record', function(done) {
        Semantic.Usertable.destroy({ first_name: 'Destroy' }, function(err, records) {
          assert.ifError(err);
          assert(Array.isArray(records));
          assert.strictEqual(records.length, 1);
          assert.equal(records[0].first_name, 'Destroy');
          assert.equal(records[0].last_name, 'Test');
          done();
        });
      });

      it('should return an empty array when searched for', function(done) {
        Semantic.Usertable.find({ first_name: 'Destroy' }, function(err, users) {
          assert.strictEqual(users.length, 0);
          done();
        });
      });

    });

    describe('with numeric ID', function() {

      /////////////////////////////////////////////////////
      // TEST SETUP
      ////////////////////////////////////////////////////

      var user;

      // Create a user to test destroy on
      before(function(done) {
        Semantic.Usertable.create({ first_name: 'Destroy', last_name: 'Test' }, function(err, record) {
          if(err) return done(err);
          user = record;
          done();
        });
      });

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should destroy a record', function(done) {
        Semantic.Usertable.destroy(user.id, function(err, status) {
          assert.ifError(err);
          done();
        });
      });

      it('should return an empty array when searched for', function(done) {
        Semantic.Usertable.find({ first_name: 'Destroy' }, function(err, users) {
          assert.strictEqual(users.length, 0);
          done();
        });
      });
    });

    describe('multiple records', function() {

      /////////////////////////////////////////////////////
      // TEST SETUP
      ////////////////////////////////////////////////////

      beforeEach(function(done) {
        Semantic.Usertable.createEach([
          { first_name: 'dummy_test' },
          { first_name: 'dummy_test' },
          { first_name: 'dummy_test' }
        ], done);
      });

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should destroy all the records', function(done) {
        Semantic.Usertable.destroy(function(err, users) {
          assert.ifError(err);
          done();
        });
      });

      it('should return an empty array when searched for', function(done) {
        Semantic.Usertable.find({ first_name: 'Destroy' }, function(err, users) {
          assert.strictEqual(users.length, 0);
          done();
        });
      });
    });

    describe('IN query', function() {

      /////////////////////////////////////////////////////
      // TEST SETUP
      ////////////////////////////////////////////////////

      beforeEach(function(done) {
        Semantic.Usertable.createEach([
          { first_name: 'dummy_test_in' },
          { first_name: 'dummy_test_in' },
          { first_name: 'dummy_test_in' }
        ], done);
      });

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it.skip('should not destroy any records', function(done) {
        Semantic.Usertable.destroy({ id: [] }, function(err, users) {
          assert.ifError(err);
          assert.strictEqual(users.length, 0);

          Semantic.Usertable.find({ first_name: 'dummy_test_in' }, function(err, users) {
            assert.ifError(err);
            assert.strictEqual(users.length, 3);
            done();
          });
        });
      });

    });
  });
});
