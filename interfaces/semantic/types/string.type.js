var assert = require('assert'),
    _ = require('lodash');

describe('Semantic Interface', function() {

  describe('String Type', function() {
    describe('with valid data', function() {

      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////

      it('should store proper string value', function(done) {
        Semantic.User1.create({ first_name: 'Foo' }, function(err, createdRecord) {
          assert.ifError(err);
          assert.equal(createdRecord.first_name, 'Foo');
          Semantic.User1.findOne({id: createdRecord.id}, function (err, record) {
            assert.ifError(err);
            assert.equal(record.first_name, 'Foo');
            done();
          });
        });
      });

    });
  });
});
