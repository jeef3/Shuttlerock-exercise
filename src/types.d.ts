export interface CalendarEvent {
  title: string;
  description?: string;

  start: Date;
  end: Date;
  allDay?: boolean;
}
