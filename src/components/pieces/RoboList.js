import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table, Modal } from "react-bootstrap";
import DialogToast from "./DialogToast";
import RoboService from "../services/RoboService";
import { ToggleSwitch } from "react-dragswitch";

function ModalConfirmacao({ showModal, handleClose, modalData, deleteRobo }) {
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Deletar Robô
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Tem certeza que deseja deletar o Robô com o ID {modalData}?</h5>
        <p>Esta ação não poderá ser desfeita.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="danger" onClick={deleteRobo}>
          Deletar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

class RoboList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robos: [],
      modalShow: false,
      inputId: "",
      modalData: "",
      isShowingToast: false,
      nomeRobo: "",
      nome: "",
      checked: true,
    };
    this.addRobo = this.addRobo.bind(this);
    this.editarRobo = this.editarRobo.bind(this);
    this.deletarRobo = this.deletarRobo.bind(this);
    this.openToastHandle = this.openToastHandle.bind(this);
    this.closeToastHandle = this.closeToastHandle.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    RoboService.getRobos().then((response) =>
      this.setState({
        robos: response.data,
      })
    );
  }

  openToastHandle = (nome) => {
    this.setState({ isShowingToast: !this.state.isShowingToast });
    this.setState(
      {
        nomeRobo: nome,
      },
      () => {
        console.log("Robô deletado: ", this.state.nome);
      }
    );
  };

  closeToastHandle = () => {
    this.setState({ isShowingToast: !this.state.isShowingToast });
  };

  addRobo() {
    this.props.history.push("/criar");
    document.location.reload();
  }

  editarRobo(id) {
    this.props.history.push(`/editar/${id}`);
    document.location.reload();
  }

  deletarRobo() {
    RoboService.deletarRobo(this.state.inputId).then((res) => {
      this.setState({
        robos: this.state.robos.filter(
          (robo) => robo.id !== this.state.inputId
        ),
      });
    });
    console.log("Robô id ", this.state.inputId, " deletado.");
    this.openToastHandle(this.state.nomeRobo);
    this.closeModalHandle();
    this.props.history.push("/");
  }

  closeModalHandle = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };

  openModalHandle = (id, nome) => {
    this.setState({ modalShow: !this.state.modalShow });
    this.setState(
      {
        inputId: id,
        nomeRobo: nome,
      },
      () => {
        console.log("Robô a ser deletado: id ", this.state.inputId);
      }
    );
  };

  handleToggle = (id) => {
    this.setState((prevState) => {
      const newArray = prevState.robos.map((robo) => {
        if (robo.id === id) {
          const roboClicado = {
            ...robo,
            ativo: robo.ativo === "1" ? "0" : "1",
          };
          this.editarAtivo(roboClicado)
          console.log("Alterar se está ativo ou inativo: " + JSON.stringify(roboClicado));
          return roboClicado;
        }
        return robo;
      });
      return { robos: newArray };
    });
  };

  editarAtivo = (robo) => {
    RoboService.editarRobo(robo, this.state.id).then((res) => {
      this.props.history.push("/robo");
    });
  };

  render() {
    //     const {robos, isLoading} = this.state;

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

    const roboList = this.state.robos.map((robo) => {
      return (
        <tr>
          <td>
            <label>
              <div>
                <ToggleSwitch
                  checked={robo.ativo === "1" ? true : false}
                  offColor="rgb(200,0,0)"
                  onChange={() => this.handleToggle(robo.id)}
                />
                &nbsp;&nbsp;&nbsp;
                <small>{robo.ativo === "1" ? "Ativo" : "Inativo"}</small>
              </div>
            </label>
          </td>
          <td>{robo.id}</td>
          <td style={{ whiteSpace: "nowrap" }}>{robo.nome}</td>
          <td>{robo.descricao}</td>
          <td>{robo.dtExecutar}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                onClick={() => this.editarRobo(robo.id)}
              >
                Editar
              </Button>
              {/* <Button
                size="sm"
                variant="danger"
                onClick={() => this.deletarRobo(robo.id)}
              > */}
              <Button
                size="sm"
                variant="danger"
                onClick={() => this.openModalHandle(robo.id, robo.nome)}
              >
                Deletar
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Container fluid>

          <h3>Lista dos Robôs</h3>
          <p>&nbsp;</p>
          <button className="btn btn-primary" onClick={this.addRobo}>
            Adicionar Robô
          </button>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="15%">Ativo</th>
                <th width="10%">Id</th>
                <th width="20%">Nome</th>
                <th width="20%">Descrição</th>
                <th width="20%">Data Execução</th>
                <th width="20%">Actions</th>
              </tr>
            </thead>
            <tbody>{roboList}</tbody>
          </Table>
        </Container>
        <ModalConfirmacao
          showModal={this.state.modalShow}
          handleClose={this.closeModalHandle}
          modalData={this.state.inputId}
          deleteRobo={this.deletarRobo}
        />
        <DialogToast
          showToast={this.state.isShowingToast}
          handleClose={this.closeToastHandle}
          nomeRobo={this.state.nomeRobo}
          tipoDialog={"success"}
          toastTitle={"Info"}
          toastText={`O robô "${this.state.nomeRobo}" foi deletado com êxito.`}
        />
      </div>
    );
  }
}

export default RoboList;
