import React, { Component } from "react";
import RoboList from "./pieces/RoboList";
import Logs from "./pieces/Logs";

class Body extends Component {
  render() {
    return (
      <div className="container">
        <RoboList />
      </div>
    )
  }
}

export default Body
