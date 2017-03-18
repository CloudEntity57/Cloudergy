import React from 'react';
import logo from './logo.svg';
// require ('./App.css');
// import jquery from 'jquery';

const App = () => (
  // componentWillMount(){
  //   jquery.get('http://localhost:3001/test',(val)=>{
  //       console.log('val: ',val);
  //   });
  // }
  // authorize(e){
  //   e.preventDefault();
  // }

      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <div onClick={this.authorize.bind(this)} className="btn btn-primary">Log In</div>
      </div>

);

export default App;
