import { CalendarEvent } from "../types";

export function isToday(date: Date) {
  const today = new Date();

  return (
    today.getFullYear() == date.getFullYear() &&
    today.getMonth() == date.getMonth() &&
    today.getDate() == date.getDate()
  );
}

export function sort_eventByStartDate(
  eventA: CalendarEvent,
  eventB: CalendarEvent,
) {
  return new Date(eventB.start).getTime() - new Date(eventA.start).getTime();
}
