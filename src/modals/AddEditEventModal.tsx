import { MouseEventHandler } from "react";

import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";

export default function AddEditEventModal({
  onClose,
}: {
  onClose?: MouseEventHandler;
}) {
  return (
    <Modal>
      <ModalHeader title="Add Event" onClose={onClose} />
      HI
    </Modal>
  );
}
