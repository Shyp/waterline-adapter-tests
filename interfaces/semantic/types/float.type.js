var assert = require('assert'),
    _ = require('lodash');

describe('Semantic Interface', function() {

  describe('Float Type', function() {
    describe('with valid data', function() {

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should store proper float value', function(done) {
        Semantic.User1.create({ percent: 0.001 }, function(err, createdRecord) {
          assert.ifError(err);
          assert.strictEqual(createdRecord.percent, 0.001);
          Semantic.User1.findOne({id: createdRecord.id}, function(err, record) {
            assert.ifError(err);
            assert.strictEqual(record.percent, 0.001);
            done();
          });
        });
      });

    });
  });
});
