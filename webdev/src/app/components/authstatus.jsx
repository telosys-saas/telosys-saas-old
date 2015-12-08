import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'

export default class AuthStatus extends Component {
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
        <div>Logged : {this.state.username}</div>
      );
    } else {
      return (
        <div>Sign in</div>
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
  
}