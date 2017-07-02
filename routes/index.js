var express = require('express');
var router = express.Router();
var Test = require('../models/test');
var User = require('../models/user');
var Post = require('../models/post');
var Notification = require('../models/notification');
var GlobalNotification = require('../models/globalnotification');
var Metascraper = require('metascraper');
// Metascraper.scrapeUrl('https://smartset-7a283.firebaseapp.com').then((metadata)=>{
//   console.log('metadata is...: ',metadata);
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('in routes');
  res.render('index', { title: 'Express' });
});


router.get('/test', function(req, res, next) {
  Test.find({},'', function(err,testItem){
    if (testItem) {console.log('hey baby an error');}
    console.log('NYAAAAAAHHHHHHH!!!!! ',testItem);
    res.json(testItem);
  });

});

router.get('/userinfo',function(req,res,next){
  // let profile=req;
  console.log('getting every user');
  User.find({},'', function(err,profile){
    console.log('profile: ',profile);
    // if(profile.length>1){
    //   profile.filter((val)=>{
    //     return profile.userid !==undefined;
    //   });
    // }
    res.json(profile);
  });

  // User.find({req.},''
});
router.get('/userinfo/:userid',function(req,res,next){
  let userid=req.params.userid;
  // console.log('userid: ',userid);
  User.find({userid:userid},'', function(err,profile){
    if(err)console.log('error: ',err);
    // console.log('current user profile: ',profile);
    if(profile !==undefined){
      res.json(profile);
    }else{
      res.json([{
        "_id": {
            "$oid": "58f66b22a53d2954c9f580fb"
        },
        "first_name": "Joe",
        "last_name": "User",
        "photo": "http://ijmhometutors.com/tutor/server/php/files/51b855e98abd7a5143c4d0176c119c0e/picture/avatar.png",
        "largephoto": "http://ijmhometutors.com/tutor/server/php/files/51b855e98abd7a5143c4d0176c119c0e/picture/avatar.png",
        "userid": "123456",
        "__v": 0,
        "username": "Guest",
        "privacy":"everyone",
        "affiliation": "liberal",
        "education": "Bachelor's",
        "location": "Houston, TX",
        "work": "Artist/Musician/Web Developer",
        "user_story": "I'm an all-around renaissance man, living life to the fullest and doing the best I can. And I have a radical plan.",
        "allies": [
            "54321",
            "J20zp56UZbPRlZ9eB1u41sBs9qXJxBVY",
            "12345"
        ],
        "ally_requests_sent": [],
        "ally_invitations_received": []
    }]);
    }
  });
  // User.find({req.},''
});

//create user SAVE THIS
// router.post('/userinfo',function(req,res,next){
//   let user = req.body.payload;
//   let newPost = new User(user);
//   newPost.save(function(err,success){
//     if(err) console.log('error: ',err);
//   });
//   console.log('data you sent DB: ',user);
// });
//create notifications for new user
router.post('/createnotifications',function(req,res,next){
  let note = req.body.payload;
  // console.log('note: ',note);
  Notification.update({"userid":note.userid},{$setOnInsert:note},
    {upsert: true},function(err,result){
    if(err) console.log('error! ',err);
    console.log('note returned: ',note);
    res.json(note);
  });

  //add user's id to my ally requests sent list:

  // let newPost = new Notification(note);
  // console.log('new notification: ',newPost);
  // newPost.save(function(err,success){
  //   if(err) console.log('error: ',err);
  //   res.json(success);
  // });
  // console.log('note you sent DB: ',user);
});

//create global notifications for new user
router.post('/createglobalnotifications',function(req,res,next){
  let note = req.body.payload;
  // console.log('global note: ',note);
  GlobalNotification.update({"userid":note.userid},{$setOnInsert:note},
    {upsert: true},function(err,result){
    if(err) console.log('error! ',err);
    console.log('global note returned: ',note);
    res.json(note);
  });
  // let newPost = new GlobalNotification(note);
  // newPost.save(function(err,success){
  //   if(err) console.log('error: ',err);
  // });
  // console.log('data you sent DB: ',user);
});

//create user if no user exists:
router.post('/userinfo',function(req,res,next){
  console.log('creating user: ',req.body.payload.username);
  let data = req.body.payload;
  // let newUser = new User(data);
  // newUser.save(function(err,user){
  //   if(err) console.log('err! ',err);
  //   res.json(user);
  // });
  // let updated=new Date();
  // let output = {};
  User.update({"userid":data.userid},{$setOnInsert:data},
    {upsert: true},function(err,result){
      if(err) console.log('error! ',err);
      console.log('user returned: ',data);
      res.json([data]);
      // User.find({},'',function(err,user){
      //   if(err) console.log('error: ',err);
      //   console.log(
      //   res.json(user);
      //   // output.user = user;
      // });
      // res.json(result);

    });
  });


  // User.find({"userid":data.userid},'',function(err,info){
  //   if(err) console.log('err');
  //   if(!info){
  //     User.update({"userid":data.userid},{$setOnInsert:data},
  //       {upsert: true},function(err,user){
  //       if(err) console.log('error! ',err);
  //       res.json(user);
  //     });
  //   }else{
  //     res.json(info);
  //   }
  // });
  //
  // res.json(data);
// });


//set specific user data:

router.post('/userinfo/:userid',function(req,res,next){
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

//route for updating profile:

router.post('/updateprofile',function(req,res,next){
  let target_profile=req.body;
  console.log('target profile: ',target_profile);
  let userid=req.body.payload.userid;
  let user=req.body.payload.userinfo;
  console.log('userr: ',user);
  User.findOneAndUpdate(
    {
      userid:userid
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
      res.json([user]);
    }
  );
});

const getPosts=(res)=>{
  Post.find({},'',(err,posts)=>{
    if(err){console.log('error! ', err);}
    // console.log('updated posts: ',posts);
    posts = posts.reverse();
    res.json(posts);
  });
}

//get posts:

router.get('/posts',function(req,res,next){
  getPosts(res);
  // console.log('posts: ',posts);
    // profile=profile.reverse();
    // res.json(posts);
});


//get post metadata:
router.post('/getmetadata/',function(req,res,next){
  console.log('url to search: ',req.body.payload);
  let url = req.body.payload;
  if((url.charAt(0)=='w') && (url.charAt(1)=='w')){
    let prefix="http://";
    url = prefix+url;
    console.log('url is now: ',url);
  }
  Metascraper.scrapeUrl(url).then((metadata)=>{
    console.log('site metadata: ',metadata);
    metadata.url=url;
    res.json(metadata);
  });
  // le
  // res.json(req.body.param);
});

//======================route for deleting a post:

router.post('/deletepost',function(req,res,next){
  console.log('post to delete: ', req.body.payload);
  Post.findByIdAndRemove(req.body.payload,(e)=>{
    if(e){console.log('error! ',e);}
    let results = Post.find({},'',function(err,posts){
      if(err) console.log('error: ',err);
      posts=posts.reverse();
      console.log('returning: ',posts.length);
      res.json(posts);
    });
  })


});

//submit a post:

router.post('/post',function(req,res,next){
  let post = req.body.payload;
  console.log('the freaking post: ',post);
  let newPost = new Post(post);
  newPost.save(function(err,success){
    if(err) console.log('error: ',err);
    getPosts(res);
  });
});

//update post:

router.post('/updatepost',function(req,res,next){
  console.log('req body: ',req.body);
  let post = req.body.payload.post;
  let postId = req.body.payload.id
  console.log('postId: ',postId);
  Post.findOneAndUpdate({_id:postId},{$set:{text:post}},(err,result)=>{
    if(err) console.log('error! ',err);
    getPosts(res);
  });
});


//post comment:

router.post('/postcomment',function(req,res,next){
  console.log('req body: ',req.body);
  let comment = req.body.payload.comment;

  // comment = {"comment":comment};
  let commentId = req.body.payload.id
  console.log('comment: ',comment,', ',commentId);
  Post.findOneAndUpdate({_id:commentId},{$push:{comments:comment}},(err,result)=>{
    if(err) console.log('error! ',err);
    getPosts(res);
  });

  // res.send();
});

//edit individual message's privacy:
router.post('/editprivacy',function(req,res,next){
  let data = req.body.payload;
  console.log('message to edit: ',data);
  Post.findOneAndUpdate({_id:data.id},{$set:{privacy:data.setting}},(err,result)=>{
    if(err) console.log('error! ',err);
    getPosts(res);
  });
});

//like comment:
router.post('/likecomment',function(req,res,next){
  let data = req.body.payload;
  console.log('post: ',data.post,', ',data.liker,', ',data.comment);
  let liker = data.liker;
  console.log('liker: ',liker);
  let commentid = data.comment;
  //find comment, check if user already likes comment and either add user to 'likers' array or remove user; thus toggling the like.
  Post.find({_id:data.post},'',(err,post)=>{
    if(err) console.log('error: ',err);
    console.log('post: ',post);
    let comments = post[0].comments;
    console.log('comments: ',comments);
    comment = comments.filter((val)=>{
      return val.id == commentid;
    });
    console.log('comment to like: ',comment);
    let likers = comment[0].likers;
    let index=likers.indexOf(liker);
    console.log('liker: ',index);
    if(index === -1){
      likers.push(liker);
      console.log('likers: ',likers);
      Post.findOneAndUpdate({_id:data.post},{$set:{comments:comments}},(err,post)=>{
        console.log('post is now: ',post);
        let random = Math.random();
        let info = {
          id:random,
          liker:liker,
          comment:data.comment,
          post:post._id,
          read:false
        }
        GlobalNotification.findOneAndUpdate({userid:post.uid},{$push:{likes:info}},function(err,note){
          if(err) console.log('error: ',err);
          console.log('liked notification: ',note);
        });

        getPosts(res);
      });
    }else{
      console.log('removing like');
      likers = likers.filter((val)=>{
        return val !== liker;
      });
      console.log('likers: ',likers);
      comments.forEach((val)=>{
        if(val.id == commentid){
          val.likers = likers;
        }
      });
      console.log('comments is now: ',comments);
      Post.findOneAndUpdate({_id:data.post},{$set:{comments:comments}},(err,post)=>{
        console.log('post is now: ',post);
        getPosts(res);
      });
    }
  });
});

//like post:
router.post('/likepost',function(req,res,next){
  let post = req.body.payload;
  console.log('post: ',post.post,', ',post.liker);
  let liker = post.liker;
  let newpal = post.liker;
  let likedpost = post.post;
  //find post, check if user already likes post and either add user to 'likers' array or remove user; thus toggling the like.
  Post.find({_id:post.post},'',(err,entry)=>{
    console.log('entry: ',entry);
    if(err) console.log('error: ',err);
    let likers = entry[0].likers;
    let index=likers.indexOf(liker);
    console.log('liker: ',index);
    if(index === -1){
      Post.findOneAndUpdate({_id:likedpost},{$push:{likers:liker}},(err,nextpost)=>{
        console.log('post found: ',nextpost.uid);
        let random = Math.random();
        let data = {
          id:random,
          liker:newpal,
          comment:"NA",
          post:likedpost,
          read:false
        }
        GlobalNotification.findOneAndUpdate({userid:nextpost.uid},{$push:{likes:data}},function(err,note){
          if(err) console.log('error: ',err);
          console.log('liked notification: ',note);
        });
        getPosts(res);
      });
    }else{
      Post.findOneAndUpdate({_id:likedpost},{$pull:{likers:liker}},(err,newpost)=>{
        console.log('post is now: ',newpost);
        GlobalNotification.findOneAndUpdate({userid:newpost.uid},{$pull:{likes:{liker:liker}}},function(err,note){
          if(err) console.log('error: ',err);
          console.log('unliked notification: ',note);
        });
        getPosts(res);
      });
    }
  });
});



//deleteComment
router.post('/deletecomment',function(req,res,next){
  // Post.findByIdAndRemove
  let comment = req.body.payload;
  console.log('comment: ',comment);
  console.log('id: ',parseFloat(comment.id));
  let commentid = parseFloat(comment.id);
  Post.findOneAndUpdate({_id:comment.post},{$pull:{comments:{id:commentid}}},(err,post)=>{
    if(err) console.log('error! ',err);
    // console.log('found post: ',post);
    getPosts(res);
  });
});

//like post:
// router.post('/likepost',function(req,res,next){
//   let post = req.body.payload;
//   console.log('post: ',post);
//   Post.findOneAndUpdate({_id:post},{$inc:{likes:1}},(err,post)=>{
//     console.log('post is now: ',post);
//     Post.find({},'',(err,posts)=>{
//       if(err) console.log('err: ',err);
//       res.json(posts);
//     });
//   });
// });




//reply to comment:
router.post('/replycomment',function(req,res,next){
});



//======================route for requesting an alliance with another member:

router.post('/ally/request/:id',function(req,res,next){
  let target_ally=req.body.ally_request;
  let userId = req.body.user;
  let results;
  console.log('userid: ',userId);
  console.log('target_ally: ',target_ally);
//record my id on the other person's invitations received list:
 User.findOneAndUpdate(
    {"userid":target_ally},{"$push":{ally_invitations_received:userId}},
    { "new": true, "upsert": true },(err,friend)=>{
      if(err) {console.log('error! ',err);}
      console.log('userid requesting: ',userId);
      // friend.ally_invitations_received.push({invitation:userId});
      console.log('ally invitations: ',friend.ally_invitations_received);
    });
//record their id on my own requests sent list:
User.findOneAndUpdate(
   {"userid":userId},{"$push":{ally_requests_sent:target_ally}},
   { "new": true, "upsert": true },(err,friend)=>{
     if(err) {console.log('error! ',err);}
     console.log('ally requests sent: ',friend.ally_requests_sent);
   });
  // res.send('success');
  res.json(results);
});

router.post('/clearaccept', function(req,res,next){
  console.log('ally to clear: ',req.body.payload);
  let ally = req.body.payload.ally;
  let user = req.body.payload.user;
  Notification.findOneAndUpdate({"userid":user},{"$pull":{"ally_accepts":ally}},{"new":true,"upsert":true},function(err,notes){
    if(err) console.log('error- ',err);
    console.log('notifications now: ',notes);
    res.json(notes);
  });
});

//ignore ally request:

router.post('/ignoreally', function(req,res,next){
  console.log('ally to ignore: ',req.body.payload);
  let ally = req.body.payload.ally;
  let user = req.body.payload.user;
  Notification.findOneAndUpdate({"userid":user},{"$pull":{"ally_invitations":ally}},{"new":true,"upsert":true},function(err,notes){
    if(err) console.log('error- ',err);
    console.log('notifications now: ',notes);
    res.json(notes);
  });
});

//redux route for ally request:
router.post('/allyrequest', function(req,res,next){
  console.log('request: ',req.body);
  let target_ally=req.body.payload.ally_request;
  let userId = req.body.payload.user;
  let results;
  console.log('userid: ',userId);
  console.log('target_ally: ',target_ally);
//record my id on the other person's invitations received list:
 User.findOneAndUpdate(
    {"userid":target_ally},{"$push":{ally_invitations_received:userId}},
    { "new": true, "upsert": true },(err,friend)=>{
      if(err) {console.log('error! ',err);}
      console.log('userid requesting: ',userId);
      // friend.ally_invitations_received.push({invitation:userId});
      console.log('ally invitations: ',friend.ally_invitations_received);
    });
//record their id on my own requests sent list:
User.findOneAndUpdate(
   {"userid":userId},{"$push":{ally_requests_sent:target_ally}},
   { "new": true, "upsert": true },(err,friend)=>{
     if(err) {console.log('error! ',err);}
     console.log('ally requests sent: ',friend.ally_requests_sent);
     console.log('user: ',friend);
     res.json([friend]);
   });
//send them an ally notification
  Notification.findOneAndUpdate({"userid":target_ally},{"$push":{"ally_invitations":userId},"$inc":{"read":1}},{"new":true,"upsert":true},function(err,notification){
    if(err) console.log('error! ',err);
    console.log('potential ally notifications: ',notification);
  });
});

//get notifications:

router.get('/notifications/:userid',function(req,res,next){
  // getPosts(res);
  console.log('user to update: ',req.params.userid);
  Notification.find({"userid":req.params.userid},'',function(err,results){
    if(err) console.log('error: ',err);
    console.log("this user's notifications are: ",results[0]);
      if(results[0] !==undefined){
        console.log('Nnotes: ',results);
        res.json(results);
      }else{
        Notification.find({"userid":"123456"},'',function(err,notes){
          if(err) console.log('err: ',err);
          console.log('notes: ',notes);
          res.json(notes);
        });
      }
    });
  // console.log('posts: ',posts);
    // profile=profile.reverse();
    // res.json(posts);
});

//get global notifications:

router.get('/globalnotifications/:userid',function(req,res,next){
  // getPosts(res);
  console.log('user to update: ',req.params.userid);
  GlobalNotification.find({"userid":req.params.userid},'',function(err,results){
    if(err) console.log('error: ',err);
    console.log("this user's global notifications are: ",results[0]);
    if(results[0] !==undefined){
      console.log('gnotes: ',results);
      res.json(results);
    }else{
      GlobalNotification.find({"userid":"123456"},'',function(err,notes){
        if(err) console.log('err: ',err);
        console.log('globenotes: ',notes);
        res.json(notes);
      });
    }
  });
  // console.log('posts: ',posts);
    // profile=profile.reverse();
    // res.json(posts);
});

//ally notifications seen:

router.post('/notificationsseen',function(req,res,next){
  console.log('user to update: ',req.body.payload);
  Notification.findOneAndUpdate({"userid":req.body.payload},{"read":0},function(err,results){
    if(err) console.log('error: ',err);
    // console.log('notifications are: ',results);
    res.json([results]);
  });
});

//global notifications seen:

router.post('/globalnotificationsseen',function(req,res,next){
  // console.log('user to update: ',req.body.payload);
  // GlobalNotification.findOneAndUpdate({"userid":req.body.payload},{"read":true},function(err,results){
  //   if(err) console.log('error: ',err);
  //   // console.log('global notifications are: ',results);
  //   res.json(results);
  // });
  GlobalNotification.find({userid:req.body.payload},{},function(err,notes){
    if(err) console.log('error - ',err);
    console.log('notes: ',notes);
    likes = notes[0].likes.map((val)=>{
      console.log('like: ',val);
      val.read=true;
      return val;
    });
      GlobalNotification.findOneAndUpdate({userid:req.body.payload},{$set:{likes:likes}},{new:true,upsert:true},function(err,results){
        if(err) console.log('error: ',err);
        console.log('global notifications are: ',results);
        res.json([results]);
      });
    });
  });




//create notifications:

// router.post('/createnotifications',function(req,res,next){
//   console.log('notification to create: ',req.body.payload);
//   let data = req.body.payload;
//   let newNote = new Notification(data);
//   newNote.save(function(err,note){
//     if(err) console.log('error - ',err);
//     console.log('notification created: ',note);
//     res.json(note);
//   });
// });
//
// //create notifications:
// router.post('/createglobalnotifications',function(req,res,next){
//   console.log('notification to create: ',req.body.payload);
//   let data = req.body.payload;
//   let newNote = new GlobalNotification(data);
//   newNote.save(function(err,note){
//     if(err) console.log('error - ',err);
//     console.log('notification created: ',note);
//     res.json(note);
//   });
// });


//remove (clear) like notify for individual instance:

router.post('/clearlike',function(req,res,next){
  console.log('like to clear: ',req.body.payload);
  let likedid = parseFloat(req.body.payload.liked_id);
  console.log('likedid: ',likedid);
  let userid = req.body.payload.userid;
  GlobalNotification.findOneAndUpdate({userid:userid},{$pull:{likes:{id:likedid}}},function(err,note){
    if(err) console.log('error: ',err);
    console.log('remaining notes now: ',note);
    res.json(note);
  });
});


//cancel alliance:
router.post('/cancelalliance/',function(req,res,next){
  console.log('ally id: ',req.body.payload);
  let userid = req.body.payload.userid;
  let allyid = req.body.payload.allyid;
  //remove your id from ally's list:
  User.find({"userid":allyid},'allies',(err,val)=>{
    if(err){
      console.log('error! ',err);
    }
    console.log('the allies are: ',val[0].allies);
    let allies = val[0].allies;
    let index = allies.indexOf(userid);
    allies.splice(index,1);
    console.log('now the allies are: ',allies);
    User.findOneAndUpdate({"userid":allyid},{"allies":allies},function(err,ally){
         if(err) {console.log('error! ',err);}
         console.log('updated ally list: ',ally.allies);
       });
  });
  Notification.findOneAndUpdate({"userid":allyid},{"$push":{"ally_cancels":userid},"read":false},{"new":true,"upsert":true},function(err,res){
    if(err) console.log('error! ',err);
    console.log('friendship canceled with ',allyid,', ',res);
  });
  //remove ally from your list:
  User.find({"userid":userid},'allies',(err,val)=>{
    if(err){
      console.log('error! ',err);
    }
    console.log('allies: ',val);
    console.log('the allies are: ',val[0].allies);
    let allies = val[0].allies;
    let index = allies.indexOf(allyid);
    allies.splice(index,1);
    console.log('now the allies are: ',allies);
    User.findOneAndUpdate({"userid":userid},{"allies":allies},function(err,ally){
         if(err) {console.log('error! ',err);}
         console.log('updated ally list: ',ally.allies);
         User.find({"userid":userid},{},(err,val)=>{
           if(err){
             console.log('error! ',err);
           }
           res.json(val);
         });
       });
  });
});

router.post('/deleteall',function(req,res,next){
  let user = req.body.user;
  User.remove({userid:user},function(err,userid){
    if(err) console.log('err! ',err);
    Notification.remove({userid:user},function(err,note){
      if(err) console.log('err! ',err);
      GlobalNotification.remove({userid:user},function(err,gnote){
        if(err) console.log('err! ',err);
        res.json('success');
      });
    });
  });
});

//=================================Route for accepting an alliance invitation:

router.post('/acceptally',function(req,res,next){

//   console.log('req: ',req.body);
  let newAlly = req.body.payload.allyId;
  let userId = req.body.payload.userId;

//remove the ally's request from your notifications:
  Notification.findOneAndUpdate({"userid":userId},{"$pull":{"ally_invitations":newAlly}},{"new":true,"upsert":true},function(err,res){
    if(err) console.log('error: ',err);
    console.log('new ally ',newAlly,' cleared from your notifictions: ',res);
  });
  let result;
  console.log('new ally: ',newAlly);
  console.log('current user: ',userId);
//remove your id from your new ally's sent invitations list:
  User.find({"userid":newAlly},'ally_requests_sent',(err,val)=>{
    if(err){
      console.log('error! ',err);
    }
    console.log("new friend's ally requests: ",val[0].ally_requests_sent);
    let requests = val[0].ally_requests_sent;
    //go through ally's requests and remove yours:
    for(var i=0; i<requests.length; i++){
      console.log('requests[i]: ',requests[i]);
      if(requests[i] === userId){
        requests.splice(i,1);
        console.log('after removal: ',requests);
        //update the request list in the database:
        User.findOneAndUpdate({"userid":newAlly},{"ally_requests_sent":requests},function(err,ally){
             if(err) {console.log('error! ',err);}
             console.log('updated ally requests sent: ',ally.ally_requests_sent);
           });
        //add your id to your ally's friends list:
        User.findOneAndUpdate({"userid":newAlly},{"$push":{"allies":userId}},{"new": true, "upsert": true },function(err,ally){
            if(err) {console.log('error! ',err);}
          });
      }
    }
  });
  //notify new ally of invitation acceptance:
  Notification.findOneAndUpdate({"userid":newAlly},{"$push":{"ally_accepts":userId},"$inc":{"read":1}},{"new":true,"upsert":true},function(err,res){
    if(err) console.log('error --- ',err);
    console.log('new ally ',newAlly,' notified of your acceptance');
  });
// remove ally's id from your received invitations list:
  User.find({"userid":userId},'ally_invitations_received',(err,val)=>{
    if(err){
      console.log('error! ',err);
    }
    console.log("my ally invitations received: ",val[0].ally_invitations_received);
    let invitations = val[0].ally_invitations_received;
    //go through your invitations and remove ally's id:
    for(var i=0; i<invitations.length; i++){
      console.log('invitations[i]: ',invitations[i]);
      if(invitations[i] === newAlly){
        invitations.splice(i,1);
        console.log('after removal: ',invitations);
        // result = invitations;
        //update the invitations list in your database:
        User.findOneAndUpdate({"userid":userId},{"ally_invitations_received":invitations},function(err,user){
             if(err) {console.log('error! ',err);}
             console.log('updated ally invitations received: ',user.ally_invitations_received);
           });
        //add ally's id to your friends list:
        User.findOneAndUpdate({"userid":userId},{"$push":{"allies":newAlly}},{"new": true, "upsert": true },function(err,user){
            if(err) {console.log('error! ',err);}
            console.log('user: ',user);
            res.json([user]);
          });
      }
    }
  });


});







module.exports = router;
