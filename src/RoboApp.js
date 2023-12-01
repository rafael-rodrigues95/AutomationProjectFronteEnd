import React, { Component } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import RoboList from "./components/pieces/RoboList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RoboCriar from "./components/pieces/RoboCriar";
import RoboEditar from "./components/pieces/RoboEditar";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function BasicLayout() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

class RoboApp extends Component {
  render() {
    return (
      <div className="container">
        
        <Router>
          <div className="container">
            <BasicLayout/>
            <Switch>
              <Route exact path="/" component={RoboList}></Route>
              <Route path="/criar" component={RoboCriar}></Route>
              <Route path="/editar/:id" component={RoboEditar}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default RoboApp;
