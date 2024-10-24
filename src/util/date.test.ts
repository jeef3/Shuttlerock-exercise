import { describe, expect, test } from "vitest";

import { isToday, sort_eventByStartDate } from "./date";
import { CalendarEvent } from "../types";

describe("Dates", () => {
  describe("isToday", () => {
    test("Returns true if the date is 'today'", () => {
      const now = new Date();

      const result = isToday(now);

      expect(result).toBe(true);
    });

    test("Returns false if the date is not 'today'", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      expect(isToday(yesterday)).toBe(false);
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe("sort_eventByStartDate", () => {
    test("Returns greater than 0 for later days", () => {
      const today = new Date();

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const result = sort_eventByStartDate(
        { start: today.toISOString() } as CalendarEvent,
        { start: tomorrow.toISOString() } as CalendarEvent,
      );

      expect(result > 0).toBe(true);
    });

    test("Returns less than 0 for sooner days", () => {
      const today = new Date();

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const result = sort_eventByStartDate(
        { start: today.toISOString() } as CalendarEvent,
        { start: yesterday.toISOString() } as CalendarEvent,
      );

      expect(result < 0).toBe(true);
    });
  });
});
