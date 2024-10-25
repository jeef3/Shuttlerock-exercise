export interface CalendarEvent {
  id: string;

  title: string;
  description?: string;

  start: string;
  end: string;
  allDay?: boolean;

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
