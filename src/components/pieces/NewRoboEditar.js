import React, { Component, useState } from "react";
import RoboService from "../services/RoboService";
import { Container } from "react-bootstrap";
import { ToggleSwitch } from "react-dragswitch";
import { useHistory } from "react-router-dom";
import "react-dragswitch/dist/index.css";
import DialogToast from "./DialogToast";

function NewRoboEditar() {
  const [robos, setRobos] = useState([]);
  const [id, setId] = useState([""]);
  const [nome, setNome] = useState([""]);
  const [dtExecutar, setDtExecutar] = useState([""]);
  const [descricao, setDescricao] = useState([""]);
  const [ativo, setAtivo] = useState([""]);
  const [nomeRobo, setNomeRobo] = useState([""]);
  const [checked, setChecked] = useState([""]);
  const [isInputEnabled, setIsInputEnabled] = useState([false]);
  const [isShowingErrorToast, setIsShowingErrorToast] = useState([false]);
  const [isShoisShowingInfoToast, setIsShowingInfoToast] = useState([false]);
  const [isShowingEmptyErrorToast, setIsShowingEmptyErrorToast] = useState([
    false,
  ]);

  useEffect(() => {
    RoboService.getRoboById(id).then((response) => {
      let robo = response.data;
      setRobos({
        id: robo.id,
        nome: robo.nome,
        dtExecutar: robo.dtExecutar,
        descricao: robo.descricao,
        ativo: robo.ativo,
        checked: this.state.ativo === "1" ? true : false,
      });
      window.onpopstate = () => {
        history.push("/");
        document.location.reload();
      };
    });
  }, []);

  //      Gerenciamento da abertura e fechamento dos Toasts
  //////////////////////////////////////////////////////////////////

  const onpenErrorToastHandle = (nome) => {
    setIsShowingErrorToast(!isShowingEmptyErrorToast);
    setNomeRobo(nome);
    console.log("Robô deletado: ", nomeRobo);
  };

  const closeErrorToastHandle = () => {
    setIsShowingErrorToast(!isShowingErrorToast);
  };

  const onpenInfoToastHandle = (nome) => {
    setIsShowingInfoToast(!isShowingInfoToast);
    setNomeRobo(nome);
    console.log("Robô criado: ", nomeRobo);
  };

  const closeInfoToastHandle = () => {
    setIsShowingInfoToast(!isShowingInfoToast);
  };

  const openEmptyErrorToastHandle = () => {
    setIsShowingEmptyErrorToast(!isShowingEmptyErrorToast);
  };

  const closeEmptyErrorToastHandle = () => {
    setIsShowingEmptyErrorToast(!isShowingEmptyErrorToast);
  };

  ///////////////////////////////////////////////////////////////////
  //      Function editarRobo()                                   //
  /////////////////////////////////////////////////////////////////

  async function editarRobo() {
    if (nome === "") {
      openEmptyErrorToastHandle();
    } else {
      let editandoRobos = {
        idRobo: id,
        nomeRobo: nome,
        dtExecutarRobo: dtExecutar,
        descricaoRobo: descricao,
        ativoRobo: ativo,
      };
      try {
        await RoboService.getRoboByName(nome).then((response) =>
          setRobos({ robos: response.data }, () => {
            // Verifica se já existe robô com este mesmo nome
            if (editandoRobos.nomeRobo === robos.nome) {
              RoboService.getRoboById(id).then((response) =>
                setId({ robosId: response.data }, () => {
                  // Se existe robô com o mesmo nome, verifica se estou
                  // tentando editar o mesmo robô que cliquei na tela anterior
                  if (robosId.nome === nome) {
                    console.log("Editando robo => " + JSON.stringify(robos));
                    RoboService.editarRobo(robos, id).then((response) => {
                      openInfoToastHandle(nome);
                    });
                  } else {
                    openErrorToastHandle(nome);
                  }
                })
              );
            } else {
              console.log("robo => " + JSON.stringify(robos));
              RoboService.editarRobo(robos, id).then((response) => {
                this.openInfoToastHandle(nome);
              });
            }
          })
        );
      } catch (error) {
        console.error("Erro ao editar o robo: ", error);
      }
    }
  }

  //      Desabilitar Input Id
  //////////////////////////////////////////////////////////////////

  toggleInputEnable = () => setIsInputEnabled(!isInputEnabled);

  //      Edição dos Inputs do formulário
  //////////////////////////////////////////////////////////////////

  const alterarId = (event) => {
    setId(event.target.value);
  };
  const alterarNome = (event) => {
    setNome(event.target.value);
  };
  const alterarData = (event) => {
    setDtExecutar(event.target.value);
  };
  const alterarDescricao = (event) => {
    setDescricao(event.target.value);
  };

  //      Toggle Robô ativo ou inativo
  //////////////////////////////////////////////////////////////////

  const toggleHandle = (e) => {
    setChecked(e),
      () => {
        console.log("toggle state changed");
      };
    setAtivo(!checked ? "1" : "0"),
      () => {
        console.log("Clicked! Activated: ", this.state.ativo);
      };
  };

  ////////////////////////////////////////////////////////////////////
  //      Função para cancelar a edição                            //
  //////////////////////////////////////////////////////////////////

  const cancelar = () => {
    history.push("/");
  };

  ////////////////////////////////////////////////////////////////////
  //      Interface do usuário                                     //
  //////////////////////////////////////////////////////////////////
  // TODO Parei editando aqui

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
                    value={nome}
                    onChange={alterarNome}
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
                        checked={checked}
                        offColor="rgb(200,0,0)"
                        onChange={(e) => {
                          toggleHandle(e);
                        }}
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

export default NewRoboEditar;
