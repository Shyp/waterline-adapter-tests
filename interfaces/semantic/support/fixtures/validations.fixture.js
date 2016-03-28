/**
 * Dependencies
 */

var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({

  identity: 'thingtable',
  tableName: 'thingtable',
  connection: 'semantic',

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    age: {
      type: 'integer',
      required: true,
      min: 5,
      max: 20
    },
    description: 'string'
  }

});
