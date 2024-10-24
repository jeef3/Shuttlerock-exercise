import { describe, expect, test } from "vitest";

import {
  filter_eventsByDate,
  isSameDay,
  isToday,
  sort_eventByStartDate,
} from "./date";
import { CalendarEvent } from "../types";

describe("Dates", () => {
  describe("isSameDay", () => {
    test("Returns true if the date is the same day", () => {
      const then = new Date();
      const now = new Date(then);

      const result = isSameDay(then, now);

      expect(result).toBe(true);
    });

    test("Returns false if the date is not the same day", () => {
      const today = new Date();

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      expect(isSameDay(today, yesterday)).toBe(false);
      expect(isSameDay(today, tomorrow)).toBe(false);
    });
  });

  describe("isToday", () => {
    test("Returns true if the date is 'today'", () => {
      const now = new Date();

      const result = isToday(now);

      expect(result).toBe(true);
    });

    test("Returns false if the date is not 'today'", () => {
      const today = new Date();

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      expect(isToday(yesterday)).toBe(false);
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe("sort_eventByStartDate", () => {
    test("Returns greater than 0 for later days", () => {
      const today = new Date();

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const result = sort_eventByStartDate(
        { start: today.toISOString() } as CalendarEvent,
        { start: tomorrow.toISOString() } as CalendarEvent,
      );

      expect(result > 0).toBe(true);
    });

    test("Returns less than 0 for sooner days", () => {
      const today = new Date();

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const result = sort_eventByStartDate(
        { start: today.toISOString() } as CalendarEvent,
        { start: yesterday.toISOString() } as CalendarEvent,
      );

      expect(result < 0).toBe(true);
    });
  });

  describe("filter_eventsByDate", () => {
    test("Returns true if the event is on the same day", () => {
      const today = new Date();
      const event = {
        start: today.toISOString(),
      } as CalendarEvent;

      const result = filter_eventsByDate(today)(event);

      expect(result).toBe(true);
    });

    test("Returns false if event is not on the same day", () => {
      const today = new Date();

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const event = {
        start: tomorrow.toISOString(),
      } as CalendarEvent;

      const result = filter_eventsByDate(today)(event);

      expect(result).toBe(false);
    });
  });
});
