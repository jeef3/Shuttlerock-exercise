import { MouseEventHandler } from "react";

import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";
import ModalFooter from "../components/ModalFooter";

export default function AddEditEventModal({
  onClose,
}: {
  onClose?: MouseEventHandler;
}) {
  return (
    <Modal>
      <form>
        <ModalHeader title="Add Event" onClose={onClose} />

        <div>FORM</div>

        <ModalFooter />
      </form>
    </Modal>
  );
}
