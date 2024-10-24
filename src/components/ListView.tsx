import { sort_eventByStartDate } from "../util/date";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { ListContainer } from "./atoms/CalendarEventRowAtoms";
import CalendarEventRow from "./CalendarEventRow";

export default function ListView() {
  const { data: calendarEvents } = useCalendarEvents();

  return (
    <ListContainer>
      {!calendarEvents
        ? "Loading"
        : calendarEvents
            .sort(sort_eventByStartDate)
            .map((event) => (
              <CalendarEventRow key={event.id} event={event} showDate />
            ))}
    </ListContainer>
  );
}
