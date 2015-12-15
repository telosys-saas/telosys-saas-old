import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    this.status();
  }

  render() {
    const { auth, loginForm, logout } = this.props
	  if (this.state.authenticated) {
      return (
        <div> 
          <h1>Logged</h1>
          <div>
            <div>User : {this.state.username}</div>
          </div>
          <div>
            <FlatButton label="Logout" primary={true} onTouchTap={(e) => this.logout(e)} />
          </div>
        </div>
      );
    } else {
      return (
        <div> 
          <h1>Sign in to Telosys SaaS</h1>
          <form>
            <TextField hintText="username" ref="username" />
            <p />
            <TextField hintText="password" ref="password" />
            <p />
            <FlatButton label="Signin" primary={true} onTouchTap={(e) => this.loginForm(e)} />
            <FlatButton label="Sign in with GitHub" primary={false} onTouchTap={(e) => this.loginGithub(e)} />
          </form>
        </div>
      );
    }
  }

  loginGithub() {
    document.location = "api/auth/github";
  }
  /*
  loginForm(e) {
    console.log('loginForm');
    const username = this.refs.username.getValue().trim()
    const password = this.refs.password.getValue().trim()
    const payload = {
      client_name: 'FormClient',
      username: username,
      password: password,
    };
    $.post("/api/callback", payload, function(data) {
      if(!data) {
        this.setState({
          authenticated: false,
        })
      } else {
        if(!data.authenticated) {
          this.setState({
            authenticated: false,
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
      })
    });
  }
  */
  logout(e) {
    $.get("/api/auth/logout", function() {
      this.status();
    }.bind(this))
    .fail(function(e) {
      console.log('error on logout', e);
    });
  }

  status() {
    $.get("/api/auth/status", function(data) {
      if(!data) {
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
  
  
  loginForm(e) {
    const username = this.refs.username.getValue().trim()
    const password = this.refs.password.getValue().trim()
    this.props.onLoginFormClick(username, password)
  }
  
}

Login.propTypes = {
  onLoginFormClick: PropTypes.func.isRequired,
}
