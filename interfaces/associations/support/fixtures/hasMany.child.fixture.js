/**
 * Dependencies
 */

var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({

  tableName: 'paymenttable',
  identity: 'paymenttable',
  connection: 'associations',

  attributes: {
    amount: 'integer',
    type: 'string',
    apartment: {
      model: 'apartment',
      columnName: 'apartment_id'
    },
    a_customer: {
      model: 'customertable',
      columnName: 'customer_id'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.type;
      return obj;
    }
  }

});
