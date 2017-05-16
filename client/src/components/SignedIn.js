import React, { Component, PropTypes as T  } from 'react';
import AuthService from '../utils/AuthService'
import { hashHistory } from 'react-router';
import { filterUser } from './Functions';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp } from '../actions/index';

class LandingPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn:false
    }
  }
  componentWillMount(){
    const {auth} = this.props;
    const user = auth.getProfile();
    console.log('user in welcome: ',user);

  }

  handleClick(e){
    this.setState({
      loggedIn:true
    });
    hashHistory.push('/newsfeed');
  }
  logOut(){
    const {auth} = this.props;
    auth.logout();
    hashHistory.push('/landing');
  }
  render(){
    const {auth} = this.props;
    return(
      <div>
        You are signed in as:
        {/* <img src={} /> */}
        <button type="submit" onClick={this.handleClick.bind(this)}>Yes</button>
        {/* <a href="http://localhost:3000/#/newsfeed">Yes</a> */}
      </div>
    );
  }

}

function mapStateToProps(state){
  let user = state.allReducers.mainApp.user;
  return{
    user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LandingPage);
