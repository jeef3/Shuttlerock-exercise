import { describe, expect, test } from "vitest";

import { recurrenceService } from "./recurrenceService";
import type { Recurrence } from "../types";

const recurrence: Recurrence = {
  id: "abc",
  repeat: "weekly",
  recurrences: [
    {
      calendarEventId: "1",
      date: "2020-01-01",
      modified: false,
    },
    {
      calendarEventId: "2",
      date: "2020-01-08",
      modified: false,
    },
    {
      calendarEventId: "3",
      date: "2020-01-15",
      modified: false,
    },
  ],
};

describe("RecurrenceService", () => {
  describe("deleteEvent", () => {
    test("Can delete a single event from a recurring event", () => {
      const updates = recurrenceService.deleteEvent(recurrence, "2");

      expect(updates.updatedRecurrences).not.toBe(recurrence.recurrences);
      expect(updates.eventsToDelete.length).toEqual(1);
      expect(updates.eventsToDelete[0]).toEqual("2");
      expect(updates.updatedRecurrences).toEqual([
        {
          calendarEventId: "1",
          date: "2020-01-01",
          modified: false,
        },
        {
          calendarEventId: null,
          date: "2020-01-08",
          modified: true,
        },
        {
          calendarEventId: "3",
          date: "2020-01-15",
          modified: false,
        },
      ]);
    });

    test("Can delete future events from a recurring event", () => {
      const updates = recurrenceService.deleteEvent(recurrence, "2", true);

      expect(updates.updatedRecurrences).not.toBe(recurrence.recurrences);
      expect(updates.eventsToDelete.length).toEqual(2);
      expect(updates.eventsToDelete[0]).toEqual("2");
      expect(updates.eventsToDelete[1]).toEqual("3");
      expect(updates.updatedRecurrences).toEqual([
        {
          calendarEventId: "1",
          date: "2020-01-01",
          modified: false,
        },
        {
          calendarEventId: null,
          date: "2020-01-08",
          modified: true,
        },
        {
          calendarEventId: null,
          date: "2020-01-15",
          modified: true,
        },
      ]);
    });

    test("Deleting all recurring events deletes the recurrence", () => {
      const updates = recurrenceService.deleteEvent(
        {
          id: "abc",
          repeat: "weekly",
          recurrences: [
            {
              calendarEventId: null,
              date: "2020-01-01",
              modified: true,
            },
            {
              calendarEventId: "2",
              date: "2020-01-08",
              modified: false,
            },
            {
              calendarEventId: null,
              date: "2020-01-15",
              modified: true,
            },
          ],
        },
        "2",
        true,
      );

      expect(updates.updatedRecurrences).toBe(null);
      expect(updates.eventsToDelete.length).toEqual(1);
      expect(updates.eventsToDelete[0]).toEqual("2");
    });
  });
});
