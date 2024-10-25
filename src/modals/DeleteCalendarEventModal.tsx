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
  const { mutateAsync: deleteEvent, isPending } = useDeleteCalendarEvent();

  const handleDeleteClick = useCallback(async () => {
    await deleteEvent(event);
    onClose?.();
  }, [deleteEvent, event, onClose]);

  return (
    <Modal>
      <ModalHeader title="Delete Calendar Event" onClose={onClose} />

      <div style={{ padding: 16 }}>
        Are you sure you want to delete this event?
      </div>

      <ModalFooter
        buttons={
          <>
            <Button disabled={isPending} onClick={onClose}>
              Close
            </Button>
            <Button
              $type="destructive"
              disabled={isPending}
              onClick={handleDeleteClick}
            >
              {isPending ? (
                <>
                  <IconTrash size="1em" /> Deleting…
                </>
              ) : (
                <>
                  <IconTrash size="1em" /> Delete event
                </>
              )}
            </Button>
          </>
        }
      />
    </Modal>
  );
}
