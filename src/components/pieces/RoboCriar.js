import React, { Component } from "react";
import RoboService from "../services/RoboService";
import DialogToast from "./DialogTost";
export default class RoboCriar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      nome: "",
      dtExecutar: "",
      descricao: "",
      ativo: "",
      robos: [],
      isShowingToast: false,
      nomeRobo: "",
    };
    this.alterarId = this.alterarId.bind(this);
    this.alterarNome = this.alterarNome.bind(this);
    this.alterarData = this.alterarData.bind(this);
    this.alterarDescricao = this.alterarDescricao.bind(this);
    this.alterarAtivo = this.alterarAtivo.bind(this);
    this.salvarRobo = this.salvarRobo.bind(this);
    this.openToastHandle = this.openToastHandle.bind(this);
    this.closeToastHandle = this.closeToastHandle.bind(this);
  }

  componentDidMount() {}

  openToastHandle = (nome) => {
    this.setState({ isShowingToast: !this.state.isShowingToast });
    this.setState(
      {
        nome: nome,
      },
      () => {
        console.log("Robô a ser editado: ", this.state.nome);
      }
    );
  }

  closeToastHandle = () => {
    this.setState({ isShowingToast: !this.state.isShowingToast });
  }

  salvarRobo = (e) => {
    e.preventDefault();
    let robos = {
      nome: this.state.nome,
      dtExecutar: this.state.dtExecutar,
      descricao: this.state.descricao,
      ativo: this.state.ativo,
    };
    console.log("robo => " + JSON.stringify(robos));

    // Verifica se já existe robô com este mesmo nome
    RoboService.getRoboByName(this.state.nome).then((response) =>
      this.setState({ robos: response.data }, () => {
        this.state.robos.nome === this.state.nome
          ? (() => { this.openToastHandle(this.state.nome) })()
          : RoboService.createRobo(robos).then((res) => {
              this.props.history.push("/robos");
            });
      })
    );
  };

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
            <h3 className="text-center">Criar Robô</h3>
            <div className="card-body">
              <form>
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
                  <input
                    placeholder="Está ativo"
                    name="ativo"
                    className="form-control"
                    value={this.state.ativo}
                    onChange={this.alterarAtivo}
                  />
                  <p>&nbsp;</p>
                </div>
                <button className="btn btn-success" onClick={this.salvarRobo}>
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
        <DialogToast
          showToast={this.state.isShowingToast}
          handleClose={this.closeToastHandle}
          nomeRobo={this.state.nome}
          tipoDialog={'danger'}
        />
      </div>
    );
  }
}
