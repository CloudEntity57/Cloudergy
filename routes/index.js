var express = require('express');
var router = express.Router();
var Test = require('../models/test');
var User = require('../models/user');
var Post = require('../models/post');


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
    // console.log('profile: ',profile);
    res.json(profile);
  });

  // User.find({req.},''
});
router.get('/user/:userid',function(req,res,next){
  let userid=req.params.userid;
  // console.log('userid: ',userid);
  User.find({userid:userid},'', function(err,profile){
    if(err)console.log('error: ',err);
    console.log('current user profile: ',profile);
    res.json(profile);
  });
  // User.find({req.},''
});
router.post('/user',function(req,res,next){
  let user = req.body;
  let newPost = new User(user);
  newPost.save(function(err,success){
    if(err) console.log('error: ',err);
  });
  console.log('data you sent DB: ',user);
});
router.post('/user/:userid',function(req,res,next){
  let user = req.body;
  console.log('information: ',user);
  User.findOneAndUpdate(
    {
      userid:req.params.userid
    },
    {
      username:user.username,
      affiliation:user.affiliation,
      education:user.education,
      location:user.location,
      work:user.work,
      user_story:user.user_story
    },
    function(err,user){
      if(err){
        console.log('error: ',err);
      }
      console.log('success!',user);
      res.json(user);
    }
  );

});

router.post('/post',function(req,res,next){
  let post = req.body;
  console.log('post: ',post);
  let newPost = new Post(post);
  newPost.save(function(err,success){
    if(err) console.log('error: ',err);
    let posts=Post.find({},'',function(err,posts){
      if(err) console.log('error: ',err);
      res.json(posts);
    });
  });
});

router.get('/posts',function(req,res,next){
  let posts = Post.find({},'',function(err,profile){
    if(err) console.log('error: ',err);
    res.json(profile);
  });
});

module.exports = router;
