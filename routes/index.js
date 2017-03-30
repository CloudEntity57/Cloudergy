var express = require('express');
var router = express.Router();
var Test = require('../models/test');
var User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/test', function(req, res, next) {
  Test.find({},'', function(err,testItem){
    if (testItem) {console.log('hey baby an error');}
    console.log('NYAAAAAAHHHHHHH!!!!! ',testItem);
    res.json(testItem);
  });

});

router.get('/user',function(req,res,next){
  // let profile=req;
  User.find({},'', function(err,profile){
    console.log('profile: ',profile);
    res.json(profile);
  });

  // User.find({req.},''
});
module.exports = router;
