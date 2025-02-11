import { FormEvent, useCallback, useMemo } from "react";
import { IconDeviceFloppy } from "@tabler/icons-react";

import useForm from "../hooks/useForm";
import { useMutateCalendarEvent } from "../hooks/useCalendarEvents";
import { dateToInputDate } from "../util/date";
import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";
import ModalFooter from "../components/ModalFooter";
import Button from "../components/Button";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { FormControls, FormRow } from "../components/atoms/Form";

import type {
  CalendarEvent,
  CalendarEventViewModel,
  Recurrence,
} from "../types";

export default function AddEditEventModal({
  event,
  recurrence,
  onClose,
}: {
  event?: CalendarEvent | null;
  recurrence?: Recurrence | null;
  onClose?: () => void;
}) {
  const { mutateAsync: addOrUpdateEvent } = useMutateCalendarEvent();

  const isNewEvent = useMemo(() => !event?.id, [event]);

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
    useForm<CalendarEventViewModel>(
      event
        ? { ...event, repeat: recurrence?.frequency }
        : {
            title: "",
            description: "",
            start: defaultDates.start,
            end: defaultDates.end,
            allDay: false,
            external: false,
          },
    );

  const onSubmit = useCallback(
    (e: FormEvent) =>
      void handleSubmit(async (event: CalendarEventViewModel) => {
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
          <ModalHeader
            title={isNewEvent ? "Add Event" : "Edit Event"}
            onClose={onClose}
          />

          <FormControls>
            <Input
              label="Name"
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <FormRow>
              <Input
                label="Starts"
                required
                type="datetime-local"
                name="start"
                disabled={formState.isSubmitting}
                value={dateToInputDate(new Date(formData.start))}
                onChange={handleChange}
              />

              <Input
                label="Ends"
                required
                type="datetime-local"
                name="end"
                disabled={formState.isSubmitting}
                value={dateToInputDate(new Date(formData.end))}
                onChange={handleChange}
              />
            </FormRow>

            <label>
              Repeat
              <select
                name="repeat"
                disabled={!isNewEvent}
                value={formData.repeat}
                onChange={handleChange}
              >
                <option value="">Once only</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
          </FormControls>

          <ModalFooter
            buttons={
              <>
                <Button onClick={onClose}>Close</Button>
                <Button $type="action" type="submit">
                  {formState.isSubmitting ? (
                    <>
                      <IconDeviceFloppy size="1em" />{" "}
                      {isNewEvent ? "Adding event…" : "Updating event…"}
                    </>
                  ) : (
                    <>
                      <IconDeviceFloppy size="1em" />{" "}
                      {isNewEvent ? "Add event" : "Update event"}
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
