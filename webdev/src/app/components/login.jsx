import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

export default class AddTodo extends Component {
  render() {
    return (
      <div>
        <TextField hintText="username" ref="username" />
        <p />
        <TextField hintText="password" ref="password" />
        <p />
        <FlatButton label="Login" primary={true} onTouchTap={(e) => this.handleClick(e)} />
      </div>
    )
  }
  
  handleClick(e) {
    const username = this.refs.username.getValue().trim()
    const password = this.refs.password.getValue().trim()
    this.props.onAddClick(username, password)
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired,
}
