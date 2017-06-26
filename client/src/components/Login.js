import React, { Component, PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../utils/AuthService'

export class Login extends Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    console.log('props: ',this.props);
    const { auth } = this.props
    return (
      <div></div>
    )
  }
}

export default Login;
