import { FormEvent, MouseEventHandler, useCallback } from "react";

import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";
import ModalFooter from "../components/ModalFooter";
import useForm from "../hooks/useForm";
import { CalendarEvent } from "../types";
import Button from "../components/Button";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function AddEditEventModal({
  onClose,
}: {
  onClose?: MouseEventHandler;
}) {
  const { formData, formState, handleChange, handleSubmit, setError } =
    useForm<CalendarEvent>();

  const onSubmit = useCallback(
    (e: FormEvent) => void handleSubmit(async (event: CalendarEvent) => {})(e),
    [handleSubmit],
  );

  return (
    <Modal>
      <form onSubmit={onSubmit}>
        <ModalHeader title="Add Event" onClose={onClose} />

        <div>
          <label>
            Name
            <input
              required
              type="text"
              name="name"
              disabled={formState.isSubmitting}
              value={formData.title}
              onChange={handleChange}
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              disabled={formState.isSubmitting}
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Starts
            <input
              required
              type="date"
              name="name"
              disabled={formState.isSubmitting}
              value={formData.start}
              onChange={handleChange}
            />
          </label>

          <label>
            Ends
            <input
              required
              type="date"
              name="name"
              disabled={formState.isSubmitting}
              value={formData.end}
              onChange={handleChange}
            />
          </label>

          <label>
            All day?
            <input
              required
              type="checkbox"
              name="name"
              disabled={formState.isSubmitting}
              checked={formData.allDay}
              onChange={handleChange}
            />
          </label>
        </div>

        <ModalFooter
          buttons={
            <>
              <Button onClick={onClose}>Close</Button>
              <Button $type="action" type="submit">
                <IconDeviceFloppy size="1em" /> Save
              </Button>
            </>
          }
        />
      </form>
    </Modal>
  );
}
