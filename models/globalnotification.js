var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userid: {type:String, required:true},
    likes: {type:Object},
    replies: {type:Object},
    read: {type:Boolean}
});

var model = mongoose.model('GlobalNotification', schema);
// Make this available to our other files
module.exports = model;
