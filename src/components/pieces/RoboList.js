import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table, Modal } from "react-bootstrap";
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import RoboService from "../services/RoboService";

function MyVerticallyCenteredModal({ showModal, handleClose, modalData, deleteRobo }) {
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
        <Button onClick={handleClose}>Close</Button>
        <Button
          size="sm"
          variant="danger"
          onClick={deleteRobo}
        >
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
    };
    this.addRobo = this.addRobo.bind(this);
    this.editarRobo = this.editarRobo.bind(this);
    this.deletarRobo = this.deletarRobo.bind(this);
  }

  componentDidMount() {
    RoboService.getRobos().then((response) =>
      this.setState({ robos: response.data })
    );
  }

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
        robos: this.state.robos.filter((robo) => robo.id !== this.state.inputId),
      });
    });
    console.log("Robô id ", this.state.inputId, " deletado.");
    //document.location.reload();
  }

  closeModalHandle = () => {
    this.setState({ modalShow: !this.state.modalShow });
  };

  openModalHandle = (id) => {
    this.setState({ modalShow: !this.state.modalShow });
    this.setState(
      {
        inputId: id,
      },
      () => {
        console.log("Robô a ser deletado: id ", this.state.inputId);
      }
    );
  };

  render() {
    //     const {robos, isLoading} = this.state;

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

    const roboList = this.state.robos.map((robo) => {
      return (
        <tr>
          <td>{robo.id}</td>
          <td style={{ whiteSpace: "nowrap" }}>{robo.nome}</td>
          <td>{robo.descricao}</td>
          <td>{robo.ativo}</td>
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
                onClick={() => this.openModalHandle(robo.id)}
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
          <div className="float-right">
            {/* <Button color="success" tag={Link} to="/robos/new">Add robo</Button> */}
          </div>
          <h3>Lista dos Robôs</h3>
          <p>&nbsp;</p>
          <button className="btn btn-primary" onClick={this.addRobo}>
            Adicionar Robô
          </button>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="16%">Id</th>
                <th width="16%">Nome</th>
                <th width="16%">Descrição</th>
                <th width="16%">Ativo</th>
                <th width="16%">Data Execução</th>
                <th width="20%">Actions</th>
              </tr>
            </thead>
            <tbody>{roboList}</tbody>
          </Table>
        </Container>
        <MyVerticallyCenteredModal
          showModal={this.state.modalShow}
          handleClose={this.closeModalHandle}
          modalData={this.state.inputId}
          deleteRobo={this.deletarRobo}
        />
      </div>
    );
  }
}

export default RoboList;
