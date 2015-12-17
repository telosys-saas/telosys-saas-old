import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Counter1 extends Component {
  render() {
    const { counter1, counter2, add } = this.props
    return (
	    <div>
      <h1>Counter 1</h1>
		  <div>Counter 1 : {counter1.counter}</div>
		  <div>Counter 2 : {counter2}</div>
		  <div>
		    <button onClick={add}>Add</button>
		  </div>
		</div>  	
	  );
  }
}

Counter1.propTypes = {
  counter2: PropTypes.number.isRequired,
//  add: PropTypes.isRequired,
}

function mapStateToProps(state) {
  return {
    //counter1: state.counter1,
  }
}

export default connect(
  mapStateToProps
)(Counter1)
