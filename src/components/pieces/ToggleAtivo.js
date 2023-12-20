import React, { Component } from 'react'
import { DragSwitch } from 'react-dragswitch'
import 'react-dragswitch/dist/index.css'

export default class ToggleAtivo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };

  }

  render() {
    return (
      <div>
        <DragSwitch
            checked={this.state.checked}
            offColor='rgb(200,0,0)'
            onChange={c => {
                this.setState({ checked: c })
            }}
        />
      </div>
    )
  }
}
