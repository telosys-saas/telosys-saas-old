import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

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
          <h1>Not Logged in</h1>
          <div>
            <TextField hintText="username" ref="username" />
            <p />
            <TextField hintText="password" ref="password" />
            <p />
            <FlatButton label="Login" primary={true} onTouchTap={(e) => this.handleClick(e)} />
          </div>
        </div>
      );
    }
  }

  logout(e) {
    $.get("/api/auth/logout", function() {
      this.status();
    }.bind(this))
    .fail(function(e) {
      console.log('error on logout', e);
    });
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