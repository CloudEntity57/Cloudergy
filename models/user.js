var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  first_name:String,
  last_name:String,
  // username:{
  //   type:'string',
  //   required:true
  // },
  username:String,
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
