import { useMemo, useState } from "react";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { filter_eventsByDate } from "../util/date";
import CalendarEventRow from "./CalendarEventRow";
import { CalendarEvent } from "../types";

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
      <div
        style={{
          display: "grid",
          gap: 8,
          alignContent: "start",
        }}
      >
        {!dayEvents
          ? "Loading"
          : dayEvents.map((event) => (
              <CalendarEventRow key={event.id} event={event} />
            ))}
      </div>
    </div>
  );
}
