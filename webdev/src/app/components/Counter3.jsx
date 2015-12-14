import React, { Component, PropTypes } from 'react'

class Counter3 extends Component {
  render() {
    const { counter1, counter2 } = this.props
	  return (
	    <div>
      <h1>Counter 3</h1>
		  <div>Counter 1 : {counter1}</div>
		  <div>Counter 2 : {counter2}</div>
		</div>  	
	  );
  }
}

Counter3.propTypes = {
  counter1: PropTypes.number.isRequired,
  counter2: PropTypes.number.isRequired,
}

export default Counter3