/**
 * Dependencies
 */

var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({

  tableName: 'customerbelongsTable',
  identity: 'customerbelongs',
  connection: 'associations2',

  attributes: {
    name: 'string',
    title: 'string',
    payments: {
      collection: 'Paymentbelongs',
      via: 'customertable'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.name;
      return obj;
    }
  }

});
