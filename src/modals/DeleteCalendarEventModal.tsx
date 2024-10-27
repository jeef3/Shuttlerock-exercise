import { FormEvent, useCallback } from "react";
import { IconTrash } from "@tabler/icons-react";

import useForm from "../hooks/useForm";
import { useDeleteCalendarEvent } from "../hooks/useCalendarEvents";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ModalFooter from "../components/ModalFooter";
import ModalHeader from "../components/ModalHeader";
import type { CalendarEvent, DeleteCalendarEventViewModel } from "../types";

export default function DeleteCalendarEventModal({
  event,
  onClose,
}: {
  event: CalendarEvent;
  onClose?: () => void;
}) {
  const { mutateAsync: deleteEvent } = useDeleteCalendarEvent();

  const { formData, formState, handleChange, handleSubmit, setError } =
    useForm<DeleteCalendarEventViewModel>({
      ...event,
      deleteFutureEvents: false,
    });

  const onSubmit = useCallback(
    (e: FormEvent) =>
      void handleSubmit(async (event: DeleteCalendarEventViewModel) => {
        try {
          await deleteEvent(event);
          onClose?.();
        } catch {
          setError("__root__", "Something went wrong, please try again.");
        }
      })(e),
    [deleteEvent, handleSubmit, onClose, setError],
  );

  return (
    <Modal>
      <form onSubmit={onSubmit}>
        <ModalHeader title="Delete Calendar Event" onClose={onClose} />

        <div style={{ padding: 16 }}>
          <p>Are you sure you want to delete this event?</p>
          {event.recurrenceId && (
            <label>
              Dlete all future events{" "}
              <input
                type="checkbox"
                name="deleteFutureEvents"
                checked={formData.deleteFutureEvents}
                onChange={handleChange}
              />
            </label>
          )}
        </div>

        <ModalFooter
          buttons={
            <>
              <Button disabled={formState.isSubmitting} onClick={onClose}>
                No, take me back
              </Button>
              <Button
                $type="destructive"
                type="submit"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? (
                  <>
                    <IconTrash size="1em" /> Deleting…
                  </>
                ) : (
                  <>
                    <IconTrash size="1em" /> Yes, delete event
                  </>
                )}
              </Button>
            </>
          }
        />
      </form>
    </Modal>
  );
}
