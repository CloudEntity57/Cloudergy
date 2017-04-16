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
  userid:String,
  photo:String,
  affiliation:String,
  education:String,
  work:String,
  location:String,
  user_story:String
});

var model = mongoose.model('User',schema);

module.exports = model;
