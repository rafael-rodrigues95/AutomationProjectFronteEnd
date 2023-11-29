import React, { Component } from "react";
import RoboList from "./pieces/RoboList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RoboCriar from "./pieces/RoboCriar";

class Body extends Component {
  render() {
    return (
      <Router>
      <div className="container">
        <Switch>
          <Route exact path = "/" component = {RoboList}></Route>
          <Route path = "/criar" component = {RoboCriar}></Route>
          <RoboList />
        </Switch>
      </div>
      </Router>
    )
  }
}

export default Body
