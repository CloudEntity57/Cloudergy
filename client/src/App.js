import React, { PropTypes as T } from 'react'
import { Jumbotron } from 'react-bootstrap'
import jquery from 'jquery';
import LandingPage from './components/LandingPage';


// authorize(e){
//   e.preventDefault();
// }

export class App extends React.Component{

  componentWillMount(){
    jquery.get('http://localhost:3001/test',(val)=>{
        console.log('val: ',val);
    });
  }
  render(){
   let children = null;
   if (this.props.children) {
     children = React.cloneElement(this.props.children, {
       auth: this.props.route.auth //sends auth instance from route to children
     })
   }

   return (
    <Jumbotron>
      {children || <LandingPage />}
    </Jumbotron>
  )
}
}

export default App;
