export interface CalendarEvent {
  id: string;

  title: string;
  description?: string;

  start: string;
  end: string;
  allDay?: boolean;
}
