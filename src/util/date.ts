import { CalendarEvent } from "../types";

export function isSameDay(dateA: Date, dateB: Date) {
  return (
    dateA.getFullYear() == dateB.getFullYear() &&
    dateA.getMonth() == dateB.getMonth() &&
    dateA.getDate() == dateB.getDate()
  );
}

export function isToday(date: Date) {
  return isSameDay(new Date(), date);
}

export function dateToInputDate(date: Date): string {
  return date.toLocaleString("sv");
}

export function inputDateToDate(input: string): Date {
  return new Date(input);
}

export const sort_eventByStartDate =
  (direction: "ASC" | "DESC" = "ASC") =>
  (eventA: CalendarEvent, eventB: CalendarEvent) =>
    (new Date(eventB.start).getTime() - new Date(eventA.start).getTime()) *
    (direction === "ASC" ? -1 : 1);

export const filter_eventsByDate = (date: Date) => (event: CalendarEvent) =>
  isSameDay(date, new Date(event.start));
