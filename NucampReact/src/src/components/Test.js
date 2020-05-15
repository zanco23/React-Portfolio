import React, { Component } from 'react'

export default function Test() {
  return (
    <div className="test-component">
      Test | No State Available
    </div>
  )
}


export class Test2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
  }

  render() {
    return (
      <div className="test-component">
        Test2 | 
        Count {this.state.counter}
      </div>
    )
  }
}


