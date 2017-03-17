import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jquery from 'jquery';

class App extends Component {
  componentWillMount(){
    jquery.get('http://localhost:3001/test',(val)=>{
        console.log('val: ',val);
    });
  }
  authorize(e){
    e.preventDefault();
  }
  render() {
    return (
      <div className="App">
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
  }
}

export default App;
