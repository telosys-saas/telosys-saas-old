import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '../actions/counter'
import * as AuthActions from '../actions/auth'
import Counter1 from '../components/Counter1'
import Counter2 from '../components/Counter2'
import Counter3 from '../components/Counter3'
import Add from '../components/add'
import Login from '../components/login'

class App extends Component {
	render() {
    // Injected by connect() call:
    const { counter1, counter2, addCounter1, addCounter2 } = this.props
    const { auth, loginForm, logout, dispatch } = this.props
    return (
      <div>
        <Counter1 counter1={counter1} counter2={counter2.counter} add={addCounter1} />
        <p />
        <Counter2 counter1={counter1.counter} counter2={counter2.counter} add={addCounter2} />
        <p />
        <Counter3 counter1={counter1.counter} counter2={counter2.counter} />
        <p />
        <Login />
      </div>
    );
  }
}
/*
        <Login auth={auth} loginForm={loginForm} logout={logout} dispatch={dispatch} />
*/

function mapStateToProps(state) {
  return {
    counter1: state.counter1,
    counter2: state.counter2,
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
