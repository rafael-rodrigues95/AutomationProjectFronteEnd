import React, { Component, useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Table, Modal, Row, Col } from "react-bootstrap";
import DialogToast from "./DialogToast";
import RoboService from "../services/RoboService";
import RobotCard from "./cards/RobotCard"
import AtrasosCard from "./cards/AtrasosCard"
import { ToggleSwitch } from "react-dragswitch";
import { useHistory } from "react-router-dom";
import NotificacoesCard from "./cards/NotificacoesCard";
import AreaEmpCard from "./cards/AreaEmpCard";
import RespostasCard from "./cards/RespostasCard";
import MesaCard from "./cards/MesaCard";


//      Modal component
//////////////////////////////////////////////////////////////////

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


//      RoboList component
//////////////////////////////////////////////////////////////////

function RoboList() {
  const [robos, setRobos] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [inputId, setInputId] = useState([""]);
  const [modalData, setModalData] = useState([""]);
  const [isShowingToast, setIsShowingTost] = useState(false);
  const [nomeRobo, setNomeRobo] = useState([""]);
  const [nome, setNome] = useState([""]);
  const [checked, setChecked] = useState(true);
  const history = useHistory();

  useEffect(() => {
    RoboService.getRobos().then((response) => {
      setRobos(response.data);
    });
  }, []);


  //      Chama a página para criar o Robô
  //////////////////////////////////////////////////////////////////

  const addRobo = () => {
    history.push("/criar");
    document.location.reload();
  };


  //      Chama a página para editar o Robô
  //////////////////////////////////////////////////////////////////

  const roboEdit = (id) => {
    history.push(`/editar/${id}`);
    document.location.reload();
  };


  //      Função para deletar o Robô
  //////////////////////////////////////////////////////////////////

  async function deletarRobo(inputId) {
    try {
      await RoboService.deletarRobo(inputId);
      setRobos(robos.filter((robo) => robo.id !== inputId));
      console.log("Robô id", inputId, "deletado.");
      toggleShowToast(nomeRobo);
      closeModalHandle();
      history.push("/");
    } catch (error) {
      console.error("Error deleting robo:", error);
    }
  }


  //      Gerenciamento da abertura e fechamento dos Modais
  //////////////////////////////////////////////////////////////////

  const closeModalHandle = () => setModalShow(false);

  const showModalHandle = (id, nome) => {
    setInputId(id);
    setNomeRobo(nome);
    console.log("Robô a ser deletado: id ", inputId);
    setModalShow(true);
  };


  //      Gerenciamento da abertura e fechamento dos Toasts
  //////////////////////////////////////////////////////////////////

  const toggleShowToast = (nome) => {
    setIsShowingTost(!isShowingToast);
    setNomeRobo(nome);
    console.log("Robô deletado: ", nomeRobo);
  };


  //      Chama a API para editar status ativo/inativo do robô
  //////////////////////////////////////////////////////////////////

  async function editarAtivo(robo) {
    await RoboService.editarRobo(robo, robo.id).then((res) => {
      console.log(
        "Status do Robô id ", robo.id, " alterado."
      );
    });
  }


  //      Toggle Robô ativo ou inativo
  //////////////////////////////////////////////////////////////////

  const handleToggleRoboAtivo = (id) => {
    setRobos((prevRobos) => {
      const updateRobos = prevRobos.map((robo) => {
        if (robo.id === id) {
          const roboUpdated = {
            ...robo,
            ativo: robo.ativo === "1" ? "0" : "1",
          };
          editarAtivo(roboUpdated);
          console.log(
            "Alterando se o robô está ativo ou inativo: " + JSON.stringify(roboUpdated)
          );
          return roboUpdated;
        }
        return robo;
      });
      return updateRobos;
    });
  };


  //      Interface do usuário
  //////////////////////////////////////////////////////////////////

  const roboList = robos.map((robo) => {
    return (
      <tr key={robo.id}>
        <td>
          <label>
            <div>
              <ToggleSwitch
                checked={robo.ativo === "1" ? true : false}
                offColor="#f22727"
                onColor="#899d78"
                onChange={() => handleToggleRoboAtivo(robo.id)}
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
            <Button size="sm" color="primary" onClick={() => roboEdit(robo.id)}>
              Editar
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => showModalHandle(robo.id, robo.nome)}
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
        <p>&nbsp;</p>
        <Container>
        <Row>
          <Col>
          <RobotCard/>
          </Col>
          <Col>
          <NotificacoesCard/>
          </Col>
          <Col>
          <AreaEmpCard/>
          </Col>
        </Row>
        <Row>
          <Col>
          <AtrasosCard/>
          </Col>
          <Col>
          <RespostasCard/>
          </Col>
          <Col>
          <MesaCard/>
          </Col>
        </Row>
        </Container>
        <p>&nbsp;</p>
        <h3>Lista dos Robôs</h3>
        <p>&nbsp;</p>
        <button className="btn btn-primary" onClick={() => addRobo}>
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
        showModal={modalShow}
        handleClose={closeModalHandle}
        modalData={inputId}
        deleteRobo={() => deletarRobo(inputId)}
      />

      <DialogToast
        showToast={isShowingToast}
        handleClose={toggleShowToast}
        nomeRobo={nomeRobo}
        tipoDialog={"success"}
        toastTitle={"Info"}
        toastText={`O robô "${nomeRobo}" foi deletado com êxito.`}
      />
    </div>
  );
}

export default RoboList;
