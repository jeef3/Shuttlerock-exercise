import { IconTrash } from "@tabler/icons-react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ModalFooter from "../components/ModalFooter";
import ModalHeader from "../components/ModalHeader";
import { useDeleteCalendarEvent } from "../hooks/useCalendarEvents";

import type { CalendarEvent } from "../types";
import { useCallback } from "react";

export default function DeleteCalendarEventModal({
  event,
  onClose,
}: {
  event: CalendarEvent;
  onClose?: () => void;
}) {
  const { mutateAsync: deleteEvent } = useDeleteCalendarEvent();

  const handleDeleteClick = useCallback(() => {});

  return (
    <Modal>
      <ModalHeader title="Delete Calendar Event" onClose={onClose} />

      <div></div>

      <ModalFooter
        buttons={
          <>
            <Button onClick={onClose}>Close</Button>
            <Button $type="destructive" onClick={handleDeleteClick}>
              <IconTrash size="1em" /> Delete event
            </Button>
          </>
        }
      />
    </Modal>
  );
}
