import { sort_eventByStartDate } from "../util/date";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { ListContainer } from "./atoms/CalendarEventRowAtoms";
import CalendarEventRow from "./CalendarEventRow";
import CalendarEventRowLoading from "./CalendarEventRowLoading";
import { EmptyList } from "./atoms/EmptyList";

export default function ListView() {
  const { data: calendarEvents } = useCalendarEvents();

  return (
    <ListContainer>
      {!calendarEvents ? (
        <>
          <CalendarEventRowLoading showDate />
          <CalendarEventRowLoading showDate />
          <CalendarEventRowLoading showDate />
        </>
      ) : !calendarEvents.length ? (
        <EmptyList>No events</EmptyList>
      ) : (
        calendarEvents
          .sort(sort_eventByStartDate)
          .map((event) => (
            <CalendarEventRow key={event.id} event={event} showDate />
          ))
      )}
    </ListContainer>
  );
}
