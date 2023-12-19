import React, { Component } from "react";
import RoboService from "../services/RoboService";
import { Button, ButtonGroup, Container, Toast, Modal } from "react-bootstrap";
import ToggleAtivo from "./ToggleAtivo";



export default class RoboEditar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nome: "",
      dtExecutar: "",
      descricao: "",
      ativo: "",
      nomeRobo: "",
    };
    this.alterarId = this.alterarId.bind(this);
    this.alterarNome = this.alterarNome.bind(this);
    this.alterarData = this.alterarData.bind(this);
    this.alterarDescricao = this.alterarDescricao.bind(this);
    this.alterarAtivo = this.alterarAtivo.bind(this);
    this.editarRobo = this.editarRobo.bind(this);
  }

  componentDidMount() {
    RoboService.getRoboById(this.state.id).then((res) => {
      let robo = res.data;
      this.setState({
        id: robo.id,
        nome: robo.nome,
        dtExecutar: robo.dtExecutar,
        descricao: robo.descricao,
        ativo: robo.ativo,
        isInputEnabled: false,
      });
    });
  }

  editarRobo = (e) => {
    e.preventDefault();
    let robos = {
      id: this.state.id,
      nome: this.state.nome,
      dtExecutar: this.state.dtExecutar,
      descricao: this.state.descricao,
      ativo: this.state.ativo,
    };
    console.log("robo => " + JSON.stringify(robos));
    RoboService.editarRobo(robos, this.state.id).then( res => {
        this.props.history.push('/robo');
    })
  }

  toggleInputEnabled = () => {
    this.setState((prevState) => ({
      isInputEnabled: !prevState.isInputEnabled,
    }))
  }

  alterarId = (event) => {
    this.setState({ id: event.target.value });
  };
  alterarNome = (event) => {
    this.setState({ nome: event.target.value });
  };
  alterarData = (event) => {
    this.setState({ dtExecutar: event.target.value });
  };
  alterarDescricao = (event) => {
    this.setState({ descricao: event.target.value });
  };
  alterarAtivo = (event) => {
    this.setState({ ativo: event.target.value });
  };



  cancelar() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="container">
        <p>&nbsp;</p>
        <div className="row">
          <div className="card col-md-6 offset-md-3 ">
            <h3 className="text-center">Editar Robô</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Id: </label>
                  <input
                    placeholder="Id"
                    name="id"
                    className="form-control"
                    value={this.state.id}
                    onChange={this.alterarId}
                    disabled={!this.state.isInputEnabled} 
                  />
                </div>
                <div className="form-group">
                  <p>&nbsp;</p>
                  <label>Nome: </label>
                  <input
                    placeholder="Nome"
                    name="nome"
                    className="form-control"
                    value={this.state.nome}
                    onChange={this.alterarNome}
                  />
                </div>
                <div className="form-group">
                  <p>&nbsp;</p>
                  <label>Data da Execução: </label>
                  <input
                    placeholder="Data da Execução"
                    name="data-da-Execucao"
                    className="form-control"
                    value={this.state.dtExecutar}
                    onChange={this.alterarData}
                  />
                </div>
                <div className="form-group">
                  <p>&nbsp;</p>
                  <label>Descrição: </label>
                  <input
                    placeholder="Descrição"
                    name="descricao"
                    className="form-control"
                    value={this.state.descricao}
                    onChange={this.alterarDescricao}
                  />
                </div>
                <div className="form-group">
                  <p>&nbsp;</p>
                  <label>Ativo: </label>
                  {/* <input
                    placeholder="Está ativo"
                    name="ativo"
                    className="form-control"
                    value={this.state.ativo}
                    onChange={this.alterarAtivo}
                  /> */}
                  <ToggleAtivo />
                  <p>&nbsp;</p>
                </div>
                <button className="btn btn-success" onClick={this.editarRobo}>
                  Salvar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.cancelar.bind(this)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
