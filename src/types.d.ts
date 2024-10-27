export type RecurrenceFrequency = "weekly" | "monthly" | "yearly";

export interface RecurrenceCalendarEvent {
  /**
   * If `null`, the event has been deleted.
   */
  calendarEventId: string | null;
  date: string;
  modified: boolean;
}
export interface Recurrence {
  id: string;

  repeat: RecurrenceFrequency;
  recurrences: RecurrenceCalendarEvent[];
}

export interface CalendarEvent {
  id: string;

  title: string;
  description?: string;

  start: string;
  end: string;
  allDay?: boolean;

  recurrenceId?: string;

  external: boolean;
}

export interface MoonPhase {
  Date: string;

  /**
   * Moon phase:
   *
   *  * 0 = New moon
   *  * 1 = First quarter
   *  * 2 = Full moon
   *  * 3 = Last quarter
   */
  Phase: 0 | 1 | 2 | 3;
}

export interface CalendarEventViewModel extends CalendarEvent {
  id?: string;
  repeat?: RecurrenceFrequency;
}

export interface DeleteCalendarEventViewModel extends CalendarEvent {
  deleteFutureEvents: boolean;
}
