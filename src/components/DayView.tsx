import { useMemo, useState } from "react";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { filter_eventsByDate } from "../util/date";
import CalendarEventRow from "./CalendarEventRow";

export default function DayView() {
  const { data: calendarEvents } = useCalendarEvents();

  const [date, setDate] = useState<Date>(new Date());

  const dayEvents = useMemo(
    () => calendarEvents?.filter(filter_eventsByDate(date)),
    [calendarEvents, date],
  );

  return (
    <div>
      DAY VIEW
      {dayEvents?.map((event) => <CalendarEventRow event={event} />)}
    </div>
  );
}
