import { describe, expect, test } from "vitest";
import {
  CalendarEventMonthBucket,
  reduce_bucketByMonth,
  sort_bucketByMonth,
} from "./calendarEvents";
import { CalendarEvent } from "../types";

describe("Calendar Events", () => {
  describe("reduce_bucketByMonth", () => {
    test("Buckets the events by month", () => {
      const events = [
        { id: "1", title: "Jan", start: "2020-01-01" },
        { id: "2", title: "Feb", start: "2020-02-01" },
        { id: "3", title: "Feb", start: "2020-02-01" },
        { id: "4", title: "Jun", start: "2020-06-01" },
      ] as CalendarEvent[];

      const result = events.reduce(reduce_bucketByMonth, []);

      expect(result[0].month).toEqual(new Date(2020, 0));
      expect(result[1].month).toEqual(new Date(2020, 1));
      expect(result[1].calendarEvents.length).toEqual(2);
      expect(result[2].month).toEqual(new Date(2020, 5));
    });
  });

  describe("sort_bucketByMonth", () => {
    describe("Sort ascending", () => {
      test("Returns less than 0 for later days", () => {
        const today = new Date();

        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const result = sort_bucketByMonth("ASC")(
          { month: today } as CalendarEventMonthBucket,
          { month: nextMonth } as CalendarEventMonthBucket,
        );

        expect(result < 0).toBe(true);
      });

      test("Returns greater than 0 for sooner days", () => {
        const today = new Date();

        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const result = sort_bucketByMonth("ASC")(
          { month: today } as CalendarEventMonthBucket,
          { month: lastMonth } as CalendarEventMonthBucket,
        );

        expect(result > 0).toBe(true);
      });
    });

    describe("Sort descending", () => {
      test("Returns greater than 0 for later days", () => {
        const today = new Date();

        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const result = sort_bucketByMonth("DESC")(
          { month: today } as CalendarEventMonthBucket,
          { month: nextMonth } as CalendarEventMonthBucket,
        );

        expect(result > 0).toBe(true);
      });

      test("Returns less than 0 for sooner days", () => {
        const today = new Date();

        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const result = sort_bucketByMonth("DESC")(
          { month: today } as CalendarEventMonthBucket,
          { month: lastMonth } as CalendarEventMonthBucket,
        );

        expect(result < 0).toBe(true);
      });
    });
  });
});
