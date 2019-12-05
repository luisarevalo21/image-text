import React from "react";
import Spinner from "../Spinner/Spinner";
import Modal from "react-bootstrap/Modal";

const modal = props => (
  <Modal show={props.show} onHide={props.hide} centered>
    <Spinner />
  </Modal>
);

export default modal;
