import React, { Component, PropTypes } from 'react'

class Counter1 extends Component {
  render() {
    const { counter1, counter2, add } = this.props
	  return (
	    <div>
      <h1>Counter 1</h1>
		  <div>Counter 1 : {counter1}</div>
		  <div>Counter 2 : {counter2}</div>
		  <div>
		    <button onClick={add}>Add</button>
		  </div>
		</div>  	
	  );
  }
}

Counter1.propTypes = {
  counter1: PropTypes.number.isRequired,
  counter2: PropTypes.number.isRequired,
//  add: PropTypes.isRequired,
}

export default Counter1