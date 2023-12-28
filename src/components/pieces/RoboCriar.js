import React, { Component } from "react";
import { Container } from "react-bootstrap";
import RoboService from "../services/RoboService";
import DialogToast from "./DialogToast";
import { ToggleSwitch } from "react-dragswitch";
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
      isShowingErrorToast: false,
      isShowingInfoToast: false,
      isShowingEmptyErrorToast: false,
      nomeRobo: "",
      checked: true,
    };
    this.alterarId = this.alterarId.bind(this);
    this.alterarNome = this.alterarNome.bind(this);
    this.alterarData = this.alterarData.bind(this);
    this.alterarDescricao = this.alterarDescricao.bind(this);
    this.salvarRobo = this.salvarRobo.bind(this);
    this.openInfoToastHandle = this.openInfoToastHandle.bind(this);
    this.closeInfoToastHandle = this.closeInfoToastHandle.bind(this);
    this.openErrorToastHandle = this.openErrorToastHandle.bind(this);
    this.closeErrorToastHandle = this.closeErrorToastHandle.bind(this);
    this.openEmptyErrorToastHandle = this.openEmptyErrorToastHandle.bind(this);
    this.closeEmptyErrorToastHandle =
      this.closeEmptyErrorToastHandle.bind(this);
    this.toggleHandle = this.toggleHandle.bind(this);
  }

  componentDidMount() {}

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
    // this.setState(() => {
    //   console.log(
    //     "Não foi possível criar o robô porque o campo nome está vazio."
    //   );
    // });
  };

  closeEmptyErrorToastHandle = () => {
    this.setState({
      isShowingEmptyErrorToast: !this.state.isShowingEmptyErrorToast,
    });
  };

  salvarRobo = (e) => {
    e.preventDefault();
    if (this.state.nome === "") {
      this.openEmptyErrorToastHandle();
    } else {
      let robos = {
        nome: this.state.nome,
        dtExecutar: this.state.dtExecutar,
        descricao: this.state.descricao,
        ativo: this.state.ativo,
      };
      console.log("robo => " + JSON.stringify(robos));

      RoboService.getRoboByName(this.state.nome).then((response) =>
        this.setState({ robos: response.data }, () => {
          // Verifica se já existe robô com este mesmo nome
          this.state.robos.nome === this.state.nome
            ? (() => {
                this.openErrorToastHandle(this.state.nome);
              })()
            : RoboService.createRobo(robos).then((res) => {
                this.openInfoToastHandle(this.state.nome);
              });
        })
      );
      this.props.history.push("/");
    }
    this.clearForm();
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
  // alterarAtivo = (event) => {
  //   this.setState({ ativo: event.target.value });
  // };

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
        console.log("Clicado! Ativado: ", this.state.ativo);
      }
    );
  };

  clearForm() {
    this.setState({
      nome: "",
      dtExecutar: "",
      descricao: "",
    });
  }

  cancelar() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <Container fluid>
          <h3>Criar novo Robô</h3>
          <p>&nbsp;</p>
          <div className="row">
            <div className="card col-md-6 offset-md-3 ">
              <p>&nbsp;</p>
              <h5 className="text-center">{this.state.nome === "" ? 'Nome do Robô' : this.state.nome}</h5>
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
            toastText={`O Robô "${this.state.nome}" foi criado com êxito.`}
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
