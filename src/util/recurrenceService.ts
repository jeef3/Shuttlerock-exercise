import type { Recurrence, RecurrenceCalendarEvent } from "../types";

export const recurrenceService = {
  deleteEvent(
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
