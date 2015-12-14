import React, { Component, PropTypes } from 'react'

class Add extends Component {
  render() {
    const { onAddClicked } = this.props
	  return (
	    <button onClick={onAddClicked}>Add</button>	
	  );
  }
}

Add.propTypes = {
  onAddClicked: PropTypes.func.isRequired,
}

export default Add