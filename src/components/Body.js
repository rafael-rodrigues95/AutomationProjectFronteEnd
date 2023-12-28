import React, { Component } from "react";
import RoboList from "./pieces/RoboList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RoboCriar from "./pieces/RoboCriar";
import RoboEditar from "./pieces/RoboEditar";


class Body extends Component {
  render() {
    return (
      <div>
                <Router>
          <div className="container">
            <Switch>
              <Route exact path="/" component={RoboList}></Route>
              <Route path="/criar" component={RoboCriar}></Route>
              <Route path="/editar/:id" component={RoboEditar}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default Body
