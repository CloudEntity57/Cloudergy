var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  stuff:{
    type:'string',
    required:false
  }
});

var model = mongoose.model('Test', schema);
// Make this available to our other files
module.exports = model;
