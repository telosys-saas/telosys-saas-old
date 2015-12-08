import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../actions'
import Login from '../components/login'

class App extends Component {
	render() {
    // Injected by connect() call:
    const { dispatch, auth } = this.props
    return (
      <Login
        onAddClick={(username, password) =>
          dispatch(login(username, password))
        }
      >
      </Login>
    );
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    auth: state.auth,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)