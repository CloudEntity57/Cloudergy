import React, {Component} from 'react';

export default class DropButton extends Component{
  callBack(e){
    e.preventDefault();
    this.props.callback();
  }
    render(){
    return(<a onClick={this.callBack.bind(this)} className="allydropdown-cancel" href="#"><li>{this.props.text}</li></a>);
  }
}
