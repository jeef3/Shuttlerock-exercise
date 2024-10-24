import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { sort_eventByStartDate } from "../util/date";
import CalendarEventRow from "./CalendarEventRow";

export default function ListView() {
  const { data: calendarEvents } = useCalendarEvents();

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        alignContent: "start",
      }}
    >
      {!calendarEvents
        ? "Loading"
        : calendarEvents
            .sort(sort_eventByStartDate)
            .map((event) => (
              <CalendarEventRow key={event.id} event={event} showDate />
            ))}
    </div>
  );
}
