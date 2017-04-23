import jquery from 'jquery';
const authid = process.env.REACT_APP_AUTH0_CLIENT_ID;
const authdomain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth = new AuthService(authid, authdomain);
import AuthService from '../utils/AuthService';
import { hashHistory } from 'react-router';

module.exports = {
  filterUser: ()=>{
    let targetURL = "http://localhost:3001/user/"
    console.log('app js auth: ',auth);
    const profile = auth.getProfile();
    setTimeout(()=>{
      console.log('app js profile: ',profile);
      this.setState({
        profile:profile,
        test:'hello there'
      });
    },500);
    jquery.ajax({
      url:targetURL+profile.clientID,
      type:'GET',
      success:(val)=>{
        console.log('user in database: ',val);
        if(val.length===0){
          console.log('val empty! Not on file.');
          let post = jquery.ajax({
            url:targetURL,
            data:{
              first_name:profile.given_name,
              last_name:profile.family_name,
              photo:profile.picture,
              userid:profile.clientID
            },
            type:'POST'
          });
          hashHistory.push('/account');
        }
      }
    });
  },
  getUser : ()=>{
    let targetURL = "http://localhost:3001/user/";
    let user;
    console.log('app js auth: ',auth);
    const profile = auth.getProfile();
    let query = jquery.ajax({
      url:targetURL+profile.clientID,
      type:'GET',
      success:(val)=>{
        console.log('getUser says: user in database: ',val);
        user = val;
      }
    }).then(()=>{console.log('ajax over: ',user); return user;});


  },
  createDate: ()=>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = mm+'/'+dd+'/'+yyyy;
    // console.log('date: ',today);
    return today;
  }
}
