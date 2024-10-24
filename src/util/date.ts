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

export function sort_eventByStartDate(
  eventA: CalendarEvent,
  eventB: CalendarEvent,
) {
  return new Date(eventB.start).getTime() - new Date(eventA.start).getTime();
}

export const filter_eventsByDate = (date: Date) => (event: CalendarEvent) => {
  return isSameDay(date, new Date(event.start));
};
