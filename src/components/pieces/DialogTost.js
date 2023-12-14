import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function DialogToast({ showToast, handleClose, nomeRobo, tipoDialog }) {
  return (
    <ToastContainer className="p-3" position={"top-end"} style={{ zIndex: 1 }}>
      <Toast
        show={showToast}
        onClose={handleClose}
        delay={4000}
        bg={tipoDialog}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Erro</strong>
          <small></small>
        </Toast.Header>
        <Toast.Body Style="color: white">
          Já existe um robô com o nome de {nomeRobo}. Por favor escolha outro.
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default DialogToast;
