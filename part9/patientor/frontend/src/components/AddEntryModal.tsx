import React from "react";
import { Modal, Container } from "semantic-ui-react";
import { Entry } from "../types";

import ChooseEntryForm from "./ChooseEntryForm";

interface props {
  modal: boolean;
  onClose: () => void;
  onSubmit: (values: Entry) => void;
}

const AddEntryModal = ({ modal, onClose, onSubmit }: props) => {
  return (
    <Container>
      {/* eslint-disable-next-line */}
      <Modal open={modal} onClose={onClose} closeIcon>
        <Modal.Header>Add a new entry</Modal.Header>
        <Modal.Content>
          <ChooseEntryForm onSubmit={onSubmit} onClose={onClose} />
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default AddEntryModal;
