import { describe, expect, test } from "vitest";

import { recurrenceService } from "./recurrenceService";
import type { Recurrence } from "../types";

const recurrence: Recurrence = {
  id: "abc",
  frequency: "weekly",
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
  describe("createRecurringEvent", () => {
    test("Can create a recurring event", () => {
      const { eventsToCreate } = recurrenceService.createRecurringEvent(
        {
          id: "a",
          frequency: "weekly",
          recurrences: [],
        },
        {
          title: "Weekly Event",
          description: "An event that repeats weekly",
          start: "2020-01-01",
          end: "2020-01-01",

          recurrenceId: "a",

          external: false,
        },
        3,
      );

      expect(eventsToCreate.length).toBe(3);
      expect(eventsToCreate[0].recurrenceId).toBe("a");
      expect(eventsToCreate[0].start).toBe("2020-01-01T00:00:00.000Z");
      expect(eventsToCreate[1].recurrenceId).toBe("a");
      expect(eventsToCreate[1].start).toBe("2020-01-08T00:00:00.000Z");
      expect(eventsToCreate[2].recurrenceId).toBe("a");
      expect(eventsToCreate[2].start).toBe("2020-01-15T00:00:00.000Z");
    });
  });

  describe("deleteRecurringEvent", () => {
    test("Can delete a single event from a recurring event", () => {
      const { updatedRecurrences, eventsToDelete } =
        recurrenceService.deleteRecurringEvent(recurrence, "2");

      expect(updatedRecurrences).not.toBe(recurrence.recurrences);
      expect(eventsToDelete.length).toEqual(1);
      expect(eventsToDelete[0]).toEqual("2");
      expect(updatedRecurrences).toEqual([
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
      const { updatedRecurrences, eventsToDelete } =
        recurrenceService.deleteRecurringEvent(recurrence, "2", true);

      expect(updatedRecurrences).not.toBe(recurrence.recurrences);
      expect(eventsToDelete.length).toEqual(2);
      expect(eventsToDelete[0]).toEqual("2");
      expect(eventsToDelete[1]).toEqual("3");
      expect(updatedRecurrences).toEqual([
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
      const { updatedRecurrences, eventsToDelete } =
        recurrenceService.deleteRecurringEvent(
          {
            id: "abc",
            frequency: "weekly",
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

      expect(updatedRecurrences).toBe(null);
      expect(eventsToDelete.length).toEqual(1);
      expect(eventsToDelete[0]).toEqual("2");
    });
  });
});
