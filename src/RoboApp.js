import React, { Component } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// // Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";

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
      <div>

      <BasicLayout/>

      </div>
    );
  }
}

export default RoboApp;
