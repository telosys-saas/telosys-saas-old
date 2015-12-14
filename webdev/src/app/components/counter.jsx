import React, { Component, PropTypes } from 'react'

class Counter extends Component {
  render() {
    const { counter } = this.props
	  return (
	    <div>counter : {counter}</div>	
	  );
  }
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
}

export default Counter