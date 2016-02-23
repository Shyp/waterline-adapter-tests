var assert = require('assert'),
    _ = require('lodash');

describe('Semantic Interface', function() {

  describe('JSON Type', function() {
    describe('with valid data', function() {

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should store proper object value', function(done) {
        Semantic.User1.create({ obj: {foo: 'bar'} }, function(err, createdRecord) {
          assert.ifError(err);
          assert.strictEqual(createdRecord.obj, Object(createdRecord.obj));
          assert.equal(createdRecord.obj.foo, 'bar');
          Semantic.User1.findOne({id: createdRecord.id}, function (err, record) {
            assert.ifError(err);
            assert.strictEqual(record.obj, Object(record.obj));
            assert.equal(record.obj.foo, 'bar');
            done();
          });
        });
      });

    });
  });
});
