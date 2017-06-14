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

  componentWillMount(){
    this.props.setWallState('public');

  console.log('mounting newsfeed');

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
  render(){
    console.log('rendering newsfeed');

    let test = process.env.REACT_APP_FRONT_TEST_VAR;
    console.log(test,' from the front end');
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
    let user = this.props.user;
    let newstitle;
    switch(affiliation){
      case 'liberal':
        newstitle = 'Top Liberal Politics';
          break;
      case 'conservative':
        newstitle = 'Top Conservative Politics';
          break;
      case 'none':
        newstitle = 'Top Politics';
          break;
    }
    console.log('user in newsfeed render: ',user);
    let num_users = this.props.users.length;
    let num_allies = this.props.user[0].allies.length;
    console.log('there are ',num_users,' users on CouchPolitics and user has ',num_allies,' allies');

    console.log('ally rank: ',ally_rank);
    let allies_barheight = (100/(num_users-1))*num_allies;
    let users_barheight = (100/(num_users-1))*((num_users-1)-num_allies);
    let usersClass='users-bar '+this.props.user[0].affiliation;
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
    let alliespanel = (this.props.token !=='') ? (
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
    return(
      <div>
        <div className="outer-wrapper">
            <div className="wrapper">
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
  return{
    user,
    users,
    auth,
    profile,
    rand,
    router,
    affiliation,
    affiliation_display,
    token
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
