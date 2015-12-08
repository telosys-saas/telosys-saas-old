import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: 'unknown',
    };
  }

  componentDidMount() {
    this.status();
  }

  render() {
      return (
        <div>
        <div>Authenticated : {this.state.authenticated}</div>
        <div>User : {this.state.username}</div>
        <div>
          <TextField hintText="username" ref="username" />
          <p />
          <TextField hintText="password" ref="password" />
          <p />
          <FlatButton label="Login" primary={true} onTouchTap={(e) => this.handleClick(e)} />
        </div>
        </div>
      )
  }

  handleClick(e) {
    const username = this.refs.username.getValue().trim()
    const password = this.refs.password.getValue().trim()
    const payload = {
      client_name: 'FormClient',
      username: username,
      password: password,
    };
    $.post("/api/callback", payload, function(data) {
      if(!data) {
        // $('#status').text('unknown');
        this.setState({
          authenticated: false,
          username: 'unknown',
        })
      } else {
        if(!data.authenticated) {
          this.setState({
            authenticated: false,
            username: 'not logged in',
          })
        } else {
          this.setState({
            authenticated: true,
            username: data.username,
          })
        }
      }
      this.status();
    }.bind(this))
    .fail(function(e) {
      this.setState({
        authenticated: false,
        username: data.username,
      })
    });
  }
  
  status() {
    $.get("/api/auth/status", function(data) {
      if(!data) {
        this.setState({
          authenticated: 'false',
          username: 'unknown',
        })
      } else {
        if(!data.authenticated) {
          this.setState({
            authenticated: 'false',
            username: 'not logged in',
          })
        } else {
          this.setState({
            authenticated: 'true',
            username: data.userId,
          })
        }
      }
    }.bind(this), 'json')
    .fail(function(e) {
      this.setState({
        authenticated: false,
        username: data.username,
      })
    });
  }
  
  /*
  handleClick(e) {
    const username = this.refs.username.getValue().trim()
    const password = this.refs.password.getValue().trim()
    this.props.onAddClick(username, password)
  }
  */
}
/*
Login.propTypes = {
  onAddClick: PropTypes.func.isRequired,
}
*/