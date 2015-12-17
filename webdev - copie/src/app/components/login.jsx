import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../actions/auth'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.status();
  }

  render() {
    const { auth, refresh, loginForm, logout, state } = this.props
    const { authenticated } = auth;
    console.log('dispatch : ',dispatch);
    if(auth.authenticated) {
      return (
        <div>Logged in</div>
      )
    } else {
      return (
        <div>
          <p>Not logged in</p>
            <button onClick={() => refresh()}>Login</button>
        </div>
      )
    }
  }
  
  hello(e) {
    console.log('hello')
    return dispatch => {
      dispatch({
        type: REFRESH,
      })
    }
  }

  loginGithub() {
    //document.location = "api/auth/github";
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
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
