import type {
  CalendarEvent,
  Recurrence,
  RecurrenceCalendarEvent,
} from "../types";
import { generateRecurrences } from "./recurrence";

export const recurrenceService = {
  createRecurringEvent(
    recurrence: Recurrence,
    event: Omit<CalendarEvent, "id">,
    count: number = 10,
  ): {
    eventsToCreate: Omit<CalendarEvent, "id">[];
  } {
    const slots = generateRecurrences(
      new Date(event.start),
      recurrence.frequency,
      count,
    );

    event.recurrenceId = recurrence.id;

    const duration =
      new Date(event.end).getTime() - new Date(event.start).getTime();

    const eventsToCreate = [];

    for (const slot of slots) {
      eventsToCreate.push({
        ...event,

        start: slot.toISOString(),
        end: new Date(slot.getTime() + duration).toISOString(),
      });
    }

    return {
      eventsToCreate,
    };
  },

  updateRecurrences(events: CalendarEvent[]): {
    updatedRecurrences: RecurrenceCalendarEvent[];
  } {
    const updatedRecurrences = events.map((e) => ({
      calendarEventId: e.id,
      date: e.start,
      modified: false,
    }));

    return { updatedRecurrences };
  },

  updateRecurringEvent(
    recurrence: Recurrence,
    { title, description }: { title: string; description?: string },
  ): {
    updatedEvents: Pick<CalendarEvent, "id" | "title" | "description">[];
  } {
    const updatedEvents = recurrence.recurrences
      .filter((r) => r.calendarEventId)
      .map((r) => ({
        id: r.calendarEventId!,
        title,
        description,
      }));

    return { updatedEvents };
  },

  deleteRecurringEvent(
    recurrence: Recurrence,
    eventId: string,
    deleteFutureEvents: boolean = false,
  ): {
    updatedRecurrences: RecurrenceCalendarEvent[] | null;
    eventsToDelete: string[];
  } {
    // Clone recurrences
    const recurrences = recurrence.recurrences.map((r) => ({ ...r }));

    const deleteFrom = recurrences.findIndex(
      (r) => r.calendarEventId === eventId,
    );

    const eventsToDelete: string[] = [];

    recurrences.forEach((r, i) => {
      if (
        r.calendarEventId === eventId ||
        (deleteFutureEvents && i >= deleteFrom && r.calendarEventId)
      ) {
        eventsToDelete.push(r.calendarEventId);

        r.calendarEventId = null;
        r.modified = true;
      }
    });

    const eventsRemaining = recurrences.filter(
      (r) => !!r.calendarEventId,
    ).length;

    return {
      updatedRecurrences: eventsRemaining === 0 ? null : recurrences,
      eventsToDelete,
    };
  },
};
