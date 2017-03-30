var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  first_name:{
    type:'string',
    required:true
  },
  last_name:{
    type:'string',
    required:true
  },
  photo:String,
  affiliation:String
});

var model = mongoose.model('User',schema);

module.exports = model;
