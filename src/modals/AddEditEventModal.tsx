import { FormEvent, useCallback, useMemo } from "react";

import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";
import ModalFooter from "../components/ModalFooter";
import useForm from "../hooks/useForm";
import { CalendarEvent } from "../types";
import Button from "../components/Button";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useMutateCalendarEvent } from "../hooks/useCalendarEvents";
import { dateToInputDate } from "../util/date";

export default function AddEditEventModal({
  event,
  onClose,
}: {
  event?: CalendarEvent | null;
  onClose?: () => void;
}) {
  const { mutateAsync: addOrUpdateEvent } = useMutateCalendarEvent();

  const defaultDates = useMemo(() => {
    const start = new Date();

    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    return {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  }, []);

  const { formData, formState, handleChange, handleSubmit, setError } =
    useForm<CalendarEvent>(
      event ??
        ({
          start: defaultDates.start,
          end: defaultDates.end,
          allDay: false,
        } as CalendarEvent),
    );

  const onSubmit = useCallback(
    (e: FormEvent) =>
      void handleSubmit(async (event: CalendarEvent) => {
        try {
          await addOrUpdateEvent(event);
          onClose?.();
        } catch {
          setError("__root__", "Something went wrong, please try again.");
        }
      })(e),
    [handleSubmit, onClose, setError, addOrUpdateEvent],
  );

  return (
    <Modal>
      <form onSubmit={onSubmit}>
        <fieldset disabled={formState.isSubmitting}>
          <ModalHeader title="Add Event" onClose={onClose} />

          <div>
            <label>
              Name
              <input
                required
                type="text"
                name="title"
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
                type="datetime-local"
                name="start"
                disabled={formState.isSubmitting}
                value={dateToInputDate(new Date(formData.start))}
                onChange={handleChange}
              />
            </label>

            <label>
              Ends
              <input
                required
                type="datetime-local"
                name="end"
                disabled={formState.isSubmitting}
                value={dateToInputDate(new Date(formData.end))}
                onChange={handleChange}
              />
            </label>

            <label>
              All day?
              <input
                type="checkbox"
                name="allDay"
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
                  {formState.isSubmitting ? (
                    <>
                      <IconDeviceFloppy size="1em" /> Saving…
                    </>
                  ) : (
                    <>
                      <IconDeviceFloppy size="1em" /> Save
                    </>
                  )}
                </Button>
              </>
            }
          />
        </fieldset>
      </form>
    </Modal>
  );
}
