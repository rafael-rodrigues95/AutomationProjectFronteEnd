import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function DialogToast({ showToast, handleClose, tipoDialog, toastText, toastTitle }) {
  return (
    <ToastContainer className="p-3" position={"top-end"} style={{ zIndex: 1 }}>
      <Toast
        show={showToast}
        onClose={handleClose}
        delay={3000}
        bg={tipoDialog}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{toastTitle}</strong>
          <small></small>
        </Toast.Header>
        <Toast.Body Style="color: white">
          {toastText}<br />
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default DialogToast;
