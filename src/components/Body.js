import React, { Component, useEffect, useState } from "react";
import { parseString } from "xml2js";

class Body extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      statusJava: {},
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("/api/robo/motivo/listar")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          statusJava: data,
        });
        console.log("Respota Java: ", data)
      });
  }

  render() {
    //console.log("Array: ", this.state.statusJava)
    const text = this.state.carregando
      ? "Carregando..."
      : JSON.stringify(this.state.statusJava[0]);
    return (
      <div>
        <p>&nbsp;</p>
        <p>{text}</p>
      </div>
    );
  }
}

export default Body;
