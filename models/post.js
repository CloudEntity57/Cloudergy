var mongoose = require('mongoose');

var comments_schema = new mongoose.Schema({
  comment:{type:Object, ref:'Comment' }
});
var comments = mongoose.model('Comments',comments_schema);

var comment_schema = new mongoose.Schema({
  text:{type:String, required:true},
  userid:{type:String,required:true},
  likes:{type:Number},
  likers:{type:Array}
});
var comment = mongoose.model('Comment',comment_schema);

var schema = new mongoose.Schema({
  text:{
    type:String,
    required:true
  },
  uid:{
    type:String,
    required:true
  },
  comments:{ type : Object, ref:'Comments' },
  postedon:{type:String},
  commentfor:{type:String},
  affiliation:{type: String},
  date:{type: String},
  parentId:{type: String},
  likes:{type: Number},
  likers:{type:Array},
  dislikes:{type: Number}

});

var model = mongoose.model('Post',schema);

module.exports = model;
