var assert = require('assert'),
    _ = require('lodash');

describe('Semantic Interface', function() {

  describe('Boolean Type', function() {
    describe('with valid data', function() {

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should store proper boolean value', function(done) {
        Semantic.Usertable.create({ status: true }, function (err, createdRecord) {
          assert.ifError(err);
          assert.strictEqual(createdRecord.status, true);
          Semantic.Usertable.findOne({id: createdRecord.id}, function (err, record) {
            assert.ifError(err);
            assert.strictEqual(record.status, true);
            done();
          });
        });
      });

    });
  });
});
