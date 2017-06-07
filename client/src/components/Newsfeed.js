import React, { Component } from 'react';
import Header from './Header';
import StoryLinks from './StoryLinks';
import Post from './Post';
import Posts from './Posts';
import UserPanel from './UserPanel';
import { filterUser } from './Functions';
import jquery from 'jquery';
import { refresh } from 'react-router';
import { hashHistory } from 'react-router';
import { nyt_feed } from './apis/NYT_API';
import { wp_feed } from './apis/WP_API';
import { breitbart_feed } from './apis/BREIT_API';
import { push } from 'react-router-redux';
import moment from 'moment';
const nytkey=process.env.REACT_APP_NYTAPI;
const wpkey=process.env.REACT_APP_WP_API;

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp, fetchPosts, fetchAllUsers,
fetchUserInfo,
saveProfile, clearUserPageId, setWallState,login
} from '../actions/index';


class Newsfeed extends Component{
  constructor(props){
    super(props);
    const profile = this.props.auth.getProfile();
    this.props.fetchUserInfo(profile.clientID);
    //save user's third party info to store:
    this.props.saveProfile(profile);
    // //find and store all users and posts currently in the API database:
    this.props.fetchAllUsers('');
    // this.props.fetchPosts('');
    this.state={
      rand:this.props.rand,
      test:'',
      stories:[],
      affiliation:this.props.affiliation_display,
      editing:false
    }
  }
  filterPosts(){
    //convert to Redux API call:
    // this.props.fetchPosts('');

    // let postsquery = jquery.ajax({
    //   url:querystring,
    //   type:'GET',
    //   success:(posts)=>{
    //     posts = posts.reverse();
    //     posts = posts.filter((val)=>{
    //       return val.postedon=='NA';
    //     });
    //     console.log('posts: ',posts);
    //     this.setState({
    //       posts:[]
    //     });
    //     this.setState({
    //       posts:posts
    //     });
    //   }
    // });
  }
  componentWillMount(){
    this.props.setWallState('public');
    // let profile=this.props.profile;
    // this.props.fetchUserInfo(profile.clientID);
    // //save user's third party info to store:
    // this.props.getProfile(profile);
    // // //find and store all users and posts currently in the API database:
    // this.props.fetchAllUsers('');
    // this.props.fetchPosts('');
  // }
  console.log('mounting newsfeed');
  // const profile = this.props.auth.getProfile();
  // console.log('newsfeed profile: ',profile);
  // this.props.fetchUserInfo(profile.clientID);
  // //save user's third party info to store:
  // this.props.saveProfile(profile);
  // // //find and store all users and posts currently in the API database:
  // this.props.fetchAllUsers('');
  // this.props.fetchPosts('');
  // componentWillReceiveProps(){

    this.props.clearUserPageId();
    console.log('newsfeed receive props');
    let user = this.props.user;
    console.log('user in cdm newsfeed: ',user);
    this.setState({
      user:user
    });
    this.setState({
      editing:false
    });
    console.log('api key: ',nytkey);
    let affiliation = this.props.affiliation_display;
    console.log('affiliation in newsfeed: ',affiliation);
    let fullfeed=[];
    let result;
    // this.props.fetchPosts('');
    // // this.filterPosts();
    //
    let callback = (stories)=>{
      console.log('stories in callback: ',stories);
      fullfeed=fullfeed.concat(stories);
      this.setState({
        stories:fullfeed
      });
    }
      this.getNews(callback);
  }
  componentWillReceiveProps(nextProps){
    console.log('receiving newsfeed');
    const profile = this.props.auth.getProfile();
    console.log('newsfeed profile: ',profile);
    // componentWillReceiveProps(){
      console.log('newsfeed receive props');
      let user = nextProps.user;
      console.log('user in cdm newsfeed: ',user);
      this.setState({
        user:user
      });
      this.setState({
        editing:false
      });
      console.log('api key: ',nytkey);
      let affiliation = user.affiliation;
      console.log('affiliation in newsfeed: ',affiliation);
      let fullfeed=[];
      let result;
      // this.props.fetchPosts('');
      // this.filterPosts();

      // let callback = (stories)=>{
      //   console.log('stories in callback: ',stories);
      //   fullfeed=fullfeed.concat(stories);
      //   this.setState({
      //     stories:fullfeed
      //   });
      // }
      //   this.getNews(callback);
  }
  updatePosts(){
    let posts=this.props.posts;
    console.log('updating!!!');
    this.props.fetchPosts('');
    // this.forceUpdate();
  }
  componentDidMount(){
    console.log('news did mount');
    // let user = this.props.user;
    // console.log('user in cdm newsfeed: ',user);
    // this.setState({
    //   user:this.props.user
    // });
    // this.props.fetchPosts();
  }
  // componentWillReceiveProps(){
  //   let x = this.props.rand;
  //   console.log('x: ',x);
  //   this.setState({
  //     x
  //   });
  // }
  componentWillUpdate(){
    console.log('news will update');
  }
  getNews(callback){
    console.log('getting news');
    nyt_feed(nytkey,callback);
    wp_feed(wpkey,callback);
    breitbart_feed(callback);
  }
  shuffle(array){
    //Fisher-Yates shuffle algorithm:
       var currentIndex = array.length, temporaryValue, randomIndex;

       // While there remain elements to shuffle...
       while (0 !== currentIndex) {

         // Pick a remaining element...
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;

         // And swap it with the current element.
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

       return array;
  }

  emphasizeForm(e){
    let editing = this.state.editing;
    editing = (editing) ? false : true;
    this.setState({
      editing:editing
    });
  }
  hideUser(){
    console.log('hiding user baby');
  }
  goToAccount(e){
    e.preventDefault();
    console.log('going to account');
    if(this.props.authenticated){
      this.props.push('/account');
    }else{
      this.props.login();
    }
  }
  render(){
    console.log('rendering newsfeed');
    const profile = this.props.auth.getProfile();
    if(profile !== {}){
      console.log('render profile: ', profile);
    }
    let posts = (this.props.posts) ? this.props.posts : '';
    console.log('posts in newsfeed: ',posts);
    let affiliation = this.props.affiliation_display;
    console.log('affiliation in render: ',affiliation);
    let stories = this.state.stories;
    console.log('stories in newsfeed: ',stories);
    switch(affiliation){
      case 'liberal':
      stories = stories.filter((story)=>{
        return story.affiliation == 'liberal';
      });
      break;
      case 'conservative':
      stories = stories.filter((story)=>{
        return story.affiliation == 'conservative';
      });
      break;
    }
    stories = this.shuffle(stories);
    let user = this.props.user;
    console.log('user in newsfeed render: ',user);
    return(
      <div>
        <div className="outer-wrapper">
            <div className="wrapper">
                <div className="navigation-panel">
                  <div className="panel panel-default">
                    <ul>
                      <li>
                        Live News Feed
                      </li>
                      <li>
                        Friends
                      </li>
                      <li>
                        <a href="" onClick={this.goToAccount.bind(this)}>Account</a>
                      </li>
                    </ul>
                  </div>


                </div>

                <div className="posts-wrapper">
                  <Posts update={this.updatePosts.bind(this)}/>
                </div>
                  <StoryLinks stories={stories}/>

            </div>
        </div>

        {/* <UserPanel/> */}



    </div>
    )
  }
}

function mapStateToProps(state){
  let user = state.allReducers.mainApp.user;
  let auth = state.allReducers.mainApp.auth;
  let posts = state.allReducers.mainApp.posts;
  let profile = state.allReducers.mainApp.profile;
  let rand = state.allReducers.mainApp.rand;
  let affiliation = state.allReducers.mainApp.affiliation;
  let affiliation_display = state.allReducers.mainApp.affiliation_display;
  let authenticated = state.allReducers.mainApp.authenticated;
  let router=state.router;
  return{
    user,
    auth,
    profile,
    rand,
    router,
    affiliation,
    affiliation_display,
    authenticated
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp,
    fetchPosts,
    fetchAllUsers,
    fetchUserInfo,
    saveProfile,
    clearUserPageId,
    setWallState,
    push,
    login
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Newsfeed);
