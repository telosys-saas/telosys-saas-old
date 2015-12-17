import React, { Component } from 'react'
import {Treebeard} from 'react-treebeard';

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' },
            ],
        },
        {
            name: 'loading parent',
            loading: true,
            children: [],
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' },
                    ],
                },
            ],
        },
    ],
};

class TreeExample extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
        this.onButton = this.onButton.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    onButton() {
      console.log(this.state.cursor);
      console.log(this.state.cursor.name);
      this.state.cursor.name = 'toto';
    }
    render(){
        return (
            <div>
              <Treebeard
                data={data}
                onToggle={this.onToggle}
              />
              <button onClick={this.onButton}>Update</button>
            </div>
        );
    }
}

class App extends Component {
  
  render() {
    return (
      <div>
	      Application
        <TreeExample/>
      </div>
    )
  }
}





export default App;