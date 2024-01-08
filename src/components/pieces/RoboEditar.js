import React, { Component } from "react";
import RoboService from "../services/RoboService";
import { Container } from "react-bootstrap";
import { ToggleSwitch } from "react-dragswitch";
import { useHistory } from "react-router-dom"
import "react-dragswitch/dist/index.css";
import DialogToast from "./DialogToast";

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
      checked: true,
      isInputEnabled: false,
      isShowingErrorToast: false,
      isShowingInfoToast: false,
      isShowingEmptyErrorToast: false,
    };
    this.alterarId = this.alterarId.bind(this);
    this.alterarNome = this.alterarNome.bind(this);
    this.alterarData = this.alterarData.bind(this);
    this.alterarDescricao = this.alterarDescricao.bind(this);
    this.editarRobo = this.editarRobo.bind(this);
    this.toggleHandle = this.toggleHandle.bind(this);
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
        checked: this.state.ativo === "1" ? true : false,
      });
      window.onpopstate = () => {
        this.props.history.push("/");
        document.location.reload();
      };
    });
  }



  ////////////////////////////////////////////////////////////////////
  //      Gerenciamento da abertura e fechamento dos Toasts        //
  //////////////////////////////////////////////////////////////////

  openErrorToastHandle = (nome) => {
    this.setState({ isShowingErrorToast: !this.state.isShowingErrorToast });
    this.setState(
      {
        nome: nome,
      },
      () => {
        console.log("Tentando criar o robô: ", this.state.nome);
      }
    );
  };

  closeErrorToastHandle = () => {
    this.setState({ isShowingErrorToast: !this.state.isShowingErrorToast });
  };

  openInfoToastHandle = (nome) => {
    this.setState({ isShowingInfoToast: !this.state.isShowingInfoToast });
    this.setState(
      {
        nome: nome,
      },
      () => {
        console.log("Robô criado: ", this.state.nome);
      }
    );
  };

  closeInfoToastHandle = () => {
    this.setState({ isShowingInfoToast: !this.state.isShowingInfoToast });
  };

  openEmptyErrorToastHandle = () => {
    this.setState({
      isShowingEmptyErrorToast: !this.state.isShowingEmptyErrorToast,
    });
  };

  closeEmptyErrorToastHandle = () => {
    this.setState({
      isShowingEmptyErrorToast: !this.state.isShowingEmptyErrorToast,
    });
  };

  ///////////////////////////////////////////////////////////////////
  //      Function editarRobo()                                   //
  /////////////////////////////////////////////////////////////////

  editarRobo = (e) => {
    e.preventDefault();
    if (this.state.nome === "") {
      this.openEmptyErrorToastHandle();
    } else {
      let robos = {
        id: this.state.id,
        nome: this.state.nome,
        dtExecutar: this.state.dtExecutar,
        descricao: this.state.descricao,
        ativo: this.state.ativo,
      };

      RoboService.getRoboByName(this.state.nome).then((response) =>
        this.setState({ robos: response.data }, () => {
          // Verifica se já existe robô com este mesmo nome
          if (this.state.robos.nome === this.state.nome) {
            RoboService.getRoboById(this.state.id).then((response) =>
              this.setState({ robosId: response.data }, () => {
                // Se existe robô com o mesmo nome, verifica se estou
                // tentando editar o mesmo robô que cliquei na tela anterior
                if (this.state.robosId.nome === this.state.nome) {
                  console.log("robo => " + JSON.stringify(robos));
                  RoboService.editarRobo(robos, this.state.id).then((res) => {
                    this.openInfoToastHandle(this.state.nome);
                  });
                } else {
                  this.openErrorToastHandle(this.state.nome);
                }
              })
            );
          } else {
            console.log("robo => " + JSON.stringify(robos));
            RoboService.editarRobo(robos, this.state.id).then((res) => {
              this.openInfoToastHandle(this.state.nome);
            });
          }
        })
      );
    }
  };

  ////////////////////////////////////////////////////////////////////
  //      Desabilitar Input Id                                     //
  //////////////////////////////////////////////////////////////////

  toggleInputEnabled = () => {
    this.setState((prevState) => ({
      isInputEnabled: !prevState.isInputEnabled,
    }));
  };

  ////////////////////////////////////////////////////////////////////
  //      Edição dos Inputs do formulário                          //
  //////////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////////////
  //      Toggle Robô ativo ou inativo                             //
  //////////////////////////////////////////////////////////////////

  toggleHandle = (c) => {
    this.setState(
      {
        checked: c,
      },
      () => console.log("toggle state changed")
    );
    this.setState(
      {
        ativo: !this.state.checked ? "1" : "0",
      },
      () => {
        console.log("Clicked! Activated: ", this.state.ativo);
      }
    );
  };

  ////////////////////////////////////////////////////////////////////
  //      Função para cancelar a edição                            //
  //////////////////////////////////////////////////////////////////

  cancelar() {
    this.props.history.push("/");
  }

  ////////////////////////////////////////////////////////////////////
  //      Interface do usuário                                     //
  //////////////////////////////////////////////////////////////////

  render() {
    return (
      <div>
        <Container fluid>
        <p>&nbsp;</p>
          <h3>Editar Robô</h3>
          <p>&nbsp;</p>
          <div className="row">
            <div className="card col-md-6 offset-md-3 ">
              <p>&nbsp;</p>
              <h5 className="text-center">{this.state.nome}</h5>
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
                    <label>
                      <div>
                        <ToggleSwitch
                          checked={this.state.checked}
                          offColor="rgb(200,0,0)"
                          onChange={this.toggleHandle}
                        />
                        &nbsp;
                        {this.state.checked ? "Ativo" : "Inativo"}
                      </div>
                    </label>
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
          <DialogToast
            showToast={this.state.isShowingErrorToast}
            handleClose={this.closeErrorToastHandle}
            tipoDialog={"danger"}
            toastTitle={"Erro"}
            toastText={`Já existe um robô com o nome de "${this.state.nome}". Por favor escolha outro.`}
          />
          <DialogToast
            showToast={this.state.isShowingInfoToast}
            handleClose={this.closeInfoToastHandle}
            tipoDialog={"success"}
            toastTitle={"Info"}
            toastText={`As alterações no Robô "${this.state.nome}" foram salvas com êxito.`}
          />
          <DialogToast
            showToast={this.state.isShowingEmptyErrorToast}
            handleClose={this.closeEmptyErrorToastHandle}
            tipoDialog={"danger"}
            toastTitle={"Erro"}
            toastText={`Você deve definir um nome para o Robô.`}
          />
        </Container>
      </div>
    );
  }
}
