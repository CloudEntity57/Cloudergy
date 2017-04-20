var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  text:{
    type:String,
    required:true
  }
  uid:{
    type:String,
    required:true
  },
  affiliation:{type: String},
  date:{type: String},
  parentId:{type: String},
  likes:{type: Number},
  dislikes:{type: Number}

});

var model = mongoose.model('Post',schema);

module.exports = model;
