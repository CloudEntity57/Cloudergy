import React, {Component} from 'react';
import jquery from 'jquery';
import UserHeader from './UserHeader';
import NavLink from './NavLink';
import PostsUser from './PostsUser';
let functionsModule = require('./Functions');
let Functions = new functionsModule();


class UserPage extends Component{
  constructor(props){
    super(props);
    this.state={
      updated:false,
      posts:[]
    }
  }
  componentWillMount(){
    //filter user's posts:
    let userid=(this.props.params.uid) ? this.props.params.uid.toString() : '';
    console.log('userpage uid: ',userid);
      let querystring = "http://localhost:3001/posts";
      let postsquery = jquery.ajax({
        url:querystring,
        type:'GET',
        success:(posts)=>{
          posts = posts.reverse();
          console.log('userpage posts: ',posts);
          let results = [];
          for(let i=0; i<posts.length; i++){
            if(posts[i].uid || posts[i].postedon == userid){
              console.log('userpage uid: ',userid);
              console.log('compared to: ',posts[i].uid);
              results.push(posts[i]);
              console.log('posts is now: ',results);
              this.setState({
                posts:[]
              });

            }
          }

        }
      });
  }
  componentDidMount(){
    console.log('remounting');
    let targetURL = "http://localhost:3001/user/";
    let user;
    let auth = this.props.auth;
    let userid=(this.props.params.uid) ? this.props.params.uid.toString() : '';
    console.log('app js auth: ',auth);
    const profile = auth.getProfile();
    let clientID = (userid !== '') ? userid : profile.clientID;
    this.findUser(clientID,targetURL);
    this.configureUser(clientID,targetURL,userid);
  }
  componentWillReceiveProps(nextProps) {
    let auth = this.props.auth;
    const profile = auth.getProfile();
    let userid=(this.props.params.uid) ? this.props.params.uid.toString() : '';
    console.log('current user in userpage: ',userid);
    let targetURL = "http://localhost:3001/user/";
    let nextAccountId = nextProps.params.uid;
    this.configureUser(nextAccountId,targetURL,userid);

}
configureUser(postUserId,targetURL,currentuser){

  this.setState({
    username:'',
    userpic:'',
    allies:[],
    userid:postUserId
  });
  // console.log('the uid configureuser: ',currentuser);
  Functions.getUser(postUserId,targetURL).then((val)=>{
    console.log('the query is finished!',val);
    let allies=[];
    this.setState({
      username:val[0].username,
      userpic:val[0].largephoto,
      user:val[0]
    });
    let allyList = val[0].allies;
    let len = allyList.length;
    console.log('len: ',len);
    for(let i=0; i<len; i++){
      Functions.getUser(allyList[i],targetURL).then((ally)=>{
        console.log('adding ',ally[0],' to the allies array');
        allies.push(ally[0]);
          console.log('final list of allies: ',allies);
          this.setState({
            allies:allies
          });
      });
    }
  });
  //set up individual user's posts:
    let querystring = "http://localhost:3001/posts";
    let postsquery = jquery.ajax({
      url:querystring,
      type:'GET',
      success:(posts)=>{
        posts = posts.reverse();
        console.log('userpage posts: ',posts);
        console.log('currentID: ',currentuser);
        posts = posts.filter((val)=>{
          if(val.uid == postUserId){
            return val.postedon == 'NA'
          }else{
            return val.uid == postUserId || val.postedon == postUserId
          }
        });
        let results = []; 

        for(let i=0; i<posts.length; i++){
          let uidGlobalPost = posts[i].uid;
          let uidOfWallPoster = posts[i].postedon;
          if((posts[i].uid == postUserId) || (posts[i].postedon == postUserId)){
            console.log('userpage uid: ',postUserId);
            console.log('compared to: ',uidGlobalPost);
            results.push(posts[i]);
            console.log('posts is now: ',results);
            this.setState({
              posts:results
            });
          }
      }
    }
  });
  }
  render(){
    // const profile = this.props.auth.getProfile();
    let posts = (this.state.posts) ? this.state.posts : '';
    console.log('posts in userpage: ',posts);
    const username = (this.state.username) ? this.state.username : '';
    const userpic = (this.state.userpic) ? this.state.userpic : '';
    const currentUser = this.props.user;
    // const user = (this.state.profile) ? (this.state.profile[0]) : '';
    // console.log('user page user: ',user);
    const user = (this.state.user) ? this.state.user : '';
    const userid = (this.state.user) ? this.state.user.userid : '';
    console.log('user in userpage: ',user,' userid: ',userid);
    let allies = (this.state.allies) ? this.state.allies.map((ally)=>{
      let allyLink = '/user/'+ally.userid;
      return(
        <NavLink to={allyLink}>
          <a href="#">
            <div className='ally-pic'>
              <img className='img-responsive' src={ally.largephoto} />
              <div className='ally-name'>{ally.username}</div>
            </div>
          </a>
       </NavLink>
      );
    }) : '';
    let allynumber = (this.state.allies) ? this.state.allies.length : '';
    console.log('ally number: ',allynumber);
    console.log('user allies: ',this.state.allies);
    // const userpic = user.picture;
    console.log('user pic: ',userpic);
    return(
      <div>
      <div className="outer-wrapper">

      </div>
      <div className="wrapper">
        <div className="user-panel">
          <UserHeader username={username} userpic={userpic} />
          <div className="user-page-container">
            <div className="panel panel-default friends-panel">
              <div className="friends-panel-header">
                <i className="fa fa-child"></i>
                <i className="fa fa-child"></i> Allies&nbsp;&middot;&nbsp;<span>{ allynumber }</span>
              </div>
                {allies}
            </div>
            <div className="user-posts-container">
              <PostsUser posts={posts} userid={userid} user={user} currentUser={currentUser}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default UserPage;
