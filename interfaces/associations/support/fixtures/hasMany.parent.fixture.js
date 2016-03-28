/**
 * Dependencies
 */

var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({

  tableName: 'customertable',
  identity: 'customertable',
  connection: 'associations',

  attributes: {
    name: 'string',
    title: 'string',
    capital : 'integer',
    payments: {
      collection: 'Paymenttable',
      via: 'a_customer'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.name;
      return obj;
    }
  }

});
