var mongoose = require('mongoose');

var comment = new mongoose.Schema({
  comment:String
});

var schema = new mongoose.Schema({
  text:{
    type:String,
    required:true
  },
  uid:{
    type:String,
    required:true
  },
  comments:[{ type : Object, ref: comment }],
  postedon:{type:String},
  commentfor:{type:String},
  affiliation:{type: String},
  date:{type: String},
  parentId:{type: String},
  likes:{type: Number},
  dislikes:{type: Number}

});

var model = mongoose.model('Post',schema);

module.exports = model;
