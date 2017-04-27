import React, {Component} from 'react';
import jquery from 'jquery';
import UserHeader from './UserHeader';
import NavLink from './NavLink';
let functionsModule = require('./Functions');
let Functions = new functionsModule();


class UserPage extends Component{
  constructor(props){
    super(props);
    this.state={
      updated:false
    }
  }
  componentDidMount(){
    console.log('remounting');
    let targetURL = "http://localhost:3001/user/";
    let user;
    let auth = this.props.auth;
    let userid=(this.props.params.uid) ? this.props.params.uid.toString() : '';
    console.log('uid in userpage: ',userid);
    console.log('app js auth: ',auth);
    const profile = auth.getProfile();
    let clientID = (userid !== '') ? userid : profile.clientID;
    this.findUser(clientID,targetURL);

  }
  componentWillReceiveProps(nextProps) {
    let auth = this.props.auth;
    const profile = auth.getProfile();
    let targetURL = "http://localhost:3001/user/";
    let nextAccountId = nextProps.params.uid;
    this.setState({
      username:'',
      userpic:'',
      allies:[]
    });
    if (!nextAccountId) {
      console.log('its the same');
      this.configureUser(profile.clientID,targetURL);
    }
    this.configureUser(nextAccountId,targetURL);
}
configureUser(nextAccountId,targetURL){
  Functions.getUser(nextAccountId,targetURL).then((val)=>{
    console.log('the query is finished!',val);
    let allies = [];
    this.setState({
      username:val[0].username,
      userpic:val[0].largephoto
    });
    let length = val[0].allies.length;
    for(let i=0; i<length; i++){
      Functions.getUser(val[0].allies[i],targetURL).then((val)=>{
        console.log('adding ',val,' to the allies array');
        allies.push(val[0]);
        if(i===length-1){
          console.log('final list of allies: ',allies);
          this.setState({
            allies:allies
          });
        }
      });
    }
  });
}
  render(){
    // const profile = this.props.auth.getProfile();
    const username = (this.state.username) ? this.state.username : '';
    const userpic = (this.state.userpic) ? this.state.userpic : '';
    // const user = (this.state.profile) ? (this.state.profile[0]) : '';
    // console.log('user page user: ',user);
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
    console.log('user allies: ',allies);
    // const userpic = user.picture;
    console.log('user pic: ',userpic);
    return(
      <div>
      <div className="outer-wrapper">

      </div>
      <div className="wrapper">
        <div className="user-panel">
        <UserHeader username={username} userpic={userpic} />
            <div className="panel panel-default friends-panel">
              <div className="friends-panel-header">
                <i className="fa fa-child"></i>
                <i className="fa fa-child"></i> Allies&nbsp;&middot;&nbsp;<span>{ allynumber }</span>
              </div>
                {allies}
            </div>
        </div>
      </div>
    </div>
    );
  }
}

export default UserPage;
