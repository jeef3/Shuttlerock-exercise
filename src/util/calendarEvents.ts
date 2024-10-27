import { CalendarEvent } from "../types";

export interface CalendarEventMonthBucket {
  month: Date;
  calendarEvents: CalendarEvent[];
}

export function reduce_bucketByMonth(
  p: CalendarEventMonthBucket[],
  event: CalendarEvent,
): CalendarEventMonthBucket[] {
  const date = new Date(event.start);

  const bucket = p.find(
    (b) =>
      b.month.getFullYear() === date.getFullYear() &&
      b.month.getMonth() === date.getMonth(),
  );

  if (bucket) {
    bucket.calendarEvents.push(event);
  } else {
    p.push({
      month: new Date(date.getFullYear(), date.getMonth()),
      calendarEvents: [event],
    });
  }

  return p;
}

export const sort_bucketByMonth =
  (direction: "ASC" | "DESC" = "ASC") =>
  (bucketA: CalendarEventMonthBucket, bucketB: CalendarEventMonthBucket) =>
    (new Date(bucketB.month).getTime() - new Date(bucketA.month).getTime()) *
    (direction === "ASC" ? -1 : 1);
