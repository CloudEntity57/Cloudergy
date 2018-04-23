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
import {
  mainApp,
  fetchPosts,
  fetchAllUsers,
  fetchUserInfo,
  saveProfile,
  descriptionSeen,
  clearUserPageId, 
  setWallState,
  login,
  updatePost,
  editPost,
  fetchNotifications,
  fetchGlobalNotifications
} from '../actions/index';


class Newsfeed extends Component{
  constructor(props){
    super(props);
    const profile = this.props.auth.getProfile();
    if(profile.third_party_id){
      this.props.fetchUserInfo(profile.third_party_id)
    };
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
      editing:false,
      post:'',
      // description:true
    }
  }

  componentWillMount(){
    this.props.setWallState('public');

    console.log('mounting newsfeed');

    this.props.clearUserPageId();
    console.log('newsfeed receive props');
    let user = (this.props.user.length>0) ? this.props.user : [];
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
    let callback = (stories)=>{
      console.log('stories in callback: ',stories);
      fullfeed=fullfeed.concat(stories);
      fullfeed = this.shuffle(fullfeed);
      this.setState({
        stories:fullfeed
      });
    }
      this.getNews(callback);
  }
  componentWillReceiveProps(nextProps){
    // this.props.fetchAllUsers('');
    console.log('receiving newsfeed');
    const profile = this.props.auth.getProfile();
    console.log('newsfeed profile: ',profile);
    console.log('newsfeed receive props');
    let user = (nextProps.user.length>0) ? nextProps.user : [];
      this.props.fetchNotifications(user[0].userid);
      this.props.fetchGlobalNotifications(user[0].userid);
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
    // if(user.length>0){
    //   this.props.fetchNotifications(user[0].userid);
    //   this.props.fetchGlobalNotifications(user[0].userid);
    // }
    // this.props.fetchAllUsers('');
    //editing posts:
    let post = nextProps.post;
    let id = post;
    let editing = nextProps.editing;
    if(editing == true && post !==''){
      console.log('post editing in newsfeed');
      this.setState({
        postedit:true
      });

      window.scrollTo(0, 0);
      post = nextProps.posts.filter((val)=>{
        return val._id == id;
      });
      console.log('filtered post: ',post);
      this.setState({
        post:post
      });
    }
  }

  componentDidUpdate(){
    let post = this.state.post;
    console.log('filtered post: ',post);
    if(this.state.postedit){
      this.refs.editing.value = post[0].text;
    }
  }
  updatePosts(){
    let posts=this.props.posts;
    console.log('updating!!!');
    this.props.fetchPosts('');
    // this.forceUpdate();
  }
  componentDidMount(){
    console.log('news did mount');

  }

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
    if(this.props.token){
      this.props.push('/account');
    }else{
      this.props.login();
    }
  }
  updatePost(e){
    console.log('we are updating: ',e.target);
    let data = {
      id:e.target.id,
      post:this.refs.editing.value
    }
    this.props.updatePost(data);
    this.setState({
      postedit:false
    });
    this.props.editPost('',false);
  }
  cancelEdit(){
    this.setState({
      postedit:false
    });
    this.props.editPost('',false);
  }
  hideDescription(){
    // this.setState({
    //   description:false
    // })
    this.props.descriptionSeen();
  }
  render(){
    console.log('rendering newsfeed');

    // let test = process.env.REACT_APP_FRONT_TEST_VAR;
    // console.log(test,' from the front end');
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
      }).slice(0,10);
      break;
      case 'conservative':
      stories = stories.filter((story)=>{
        return story.affiliation == 'conservative';
      }).slice(0,10);
      break;
      case 'none':
      stories = stories.slice(0,10);
    }
    let user = (this.props.user.length>0) ? this.props.user : [];
    let newstitle;
    switch(affiliation){
      case 'liberal':
        newstitle = 'Stuff';
          break;
      case 'conservative':
        newstitle = 'Conservative Stuff';
          break;
      case 'none':
        newstitle = 'Indie Stuff';
          break;
    }
    console.log('user in newsfeed render: ',user);
    let num_users = (this.props.users.length>0) ? this.props.users.length : 0;
    let num_allies = (this.props.user.length>0) ? this.props.user[0].allies.length : 0;
    console.log('there are ',num_users,' users on CouchPolitics and user has ',num_allies,' allies');

    console.log('ally rank: ',ally_rank);
    let allies_barheight = ((100/(num_users-1))*num_allies <101) ? (100/(num_users-1))*num_allies : 0;
    let users_barheight = ((100/(num_users-1))*((num_users-1)-num_allies) <101) ? ((100/(num_users-1))*((num_users-1)-num_allies)) : 0;
    let usersClass=(this.props.user.length>0) ? 'users-bar '+this.props.user[0].affiliation : 'users-bar liberal';
    let usersBar = (<div className={usersClass} style={{height:allies_barheight+"px"}}></div>);
    let alliesBar = (<div className='allies-bar' style={{height:users_barheight+"px"}}></div>);
    let ally_rank;
    if(allies_barheight > 0){
      ally_rank = "Junior CouchPolitician";
    }
    if(allies_barheight > 33){
      ally_rank = "Ranking CouchPolitician";
    }
    if(allies_barheight > 66){
      ally_rank = "Senior CouchPolitician";
    }
    let alliespanel = (this.props.token) ? (
        <div className = "allies-panel panel panel-default">
        <h4>Rank</h4>
        <div className="ally-bar-container">
          {alliesBar}
          {usersBar}
        </div>
        <div>
          {ally_rank}
        </div>
      </div>
    ) : '';

    //post editing modal:
    let post_edit_background = (this.state.postedit) ? (
      <div className="post-editing-modal">
      </div>
    ) : '';
    let post_edit_modal = (this.state.postedit) ? (
      <div className="post-to-edit">
        <div className="edit-post-header">Edit Post</div>
        <form>
          <textarea ref="editing" />
          <div className='button-area'>
            <div onClick = {this.cancelEdit.bind(this)} className = "btn btn-default">Cancel</div>
            <div id={this.state.post[0]._id} onClick = {this.updatePost.bind(this)} className = "btn btn-primary">Update</div>
          </div>
        </form>
      </div>
    ) : '';
    let site_description = (this.props.description) ? (
      <div className="site_description">
        <div className="description_text">
          <div className="description_close" onClick={
            this.hideDescription.bind(this)
          }>X</div>
          <ul>
            <li>The purpose of this site is to demonstrate how a simple social network app can easily be created using React/Redux, along with Node/Express.</li>
            <li>By being able to store and manipulate information stored in a global state via Redux, complex components can be combined that are highly dependent on data that changes every time the user clicks on or types something in the browser.</li>
            <li>Like buttons, comments, user dropdown frames and more become far easier to maintain with up to the minute accuracy.</li>
          </ul>
        </div>
      </div>
    ) : '';
    return(
      <div>
        {post_edit_background}
        {post_edit_modal}
        <div className="outer-wrapper">
            <div className="wrapper">
              { site_description }
                <div className="navigation-panel">
                  <div className="nav-content-wrapper">
                  <div className="navigation-content panel panel-default">
                    <ul>
                      <li>
                        Live News Feed
                      </li>
                      <li>
                        <a href="" onClick={this.goToAccount.bind(this)}>Account</a>
                      </li>
                    </ul>
                  </div>
                  {alliespanel}
                </div>

                </div>

                <div className="posts-wrapper">
                  <Posts update={this.updatePosts.bind(this)}/>
                </div>
                  <StoryLinks newstitle={newstitle} stories={stories}/>

            </div>
        </div>
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
  let token = state.allReducers.mainApp.token;
  let router=state.router;
  let users=state.allReducers.mainApp.users;
  let post=state.allReducers.mainApp.post;
  let editing=state.allReducers.mainApp.editing;
  let description=state.allReducers.mainApp.description;
  return{
    user,
    users,
    auth,
    profile,
    rand,
    router,
    affiliation,
    affiliation_display,
    token,
    description,
    editing,
    post,
    posts
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
    login,
    updatePost,
    editPost,
    fetchNotifications,
    fetchGlobalNotifications,
    descriptionSeen
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Newsfeed);
