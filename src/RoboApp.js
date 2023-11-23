import React, { Component } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

class RoboApp extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="container">
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default RoboApp;
