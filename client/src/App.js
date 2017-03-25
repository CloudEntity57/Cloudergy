import React, { Component } from 'react';
import jquery from 'jquery';
import LandingPage from './components/LandingPage';

// authorize(e){
//   e.preventDefault();
// }

class App extends Component{

  componentWillMount(){
    jquery.get('http://localhost:3001/test',(val)=>{
        console.log('val: ',val);
    });
  }
  render(){
    let children = this.props.children;
    return(
      <div>
      {children || <LandingPage />}
      </div>
    );
  }
};

export default App;
