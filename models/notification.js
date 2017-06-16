var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  {
    userid: {type:String, required:true},
    ally_invitation: {type:Array},
    likes: {type:Object},
    replies: {type:Object},
    ally_accepts: {type:Array},
    ally_cancels: {type:Array},
    read: {type:Boolean}
}
});

var model = mongoose.model('Notification', schema);
// Make this available to our other files
module.exports = model;
