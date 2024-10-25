import { sort_eventByStartDate } from "../util/date";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { ListContainer } from "./atoms/CalendarEventRowAtoms";
import CalendarEventRow from "./CalendarEventRow";
import CalendarEventRowLoading from "./CalendarEventRowLoading";
import { EmptyList } from "./atoms/EmptyList";
import { useMemo } from "react";

export default function ListView() {
  const { data: calendarEvents } = useCalendarEvents();

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return calendarEvents?.filter(
      (event) => new Date(event.end).getTime() > now.getTime(),
    );
  }, [calendarEvents]);

  return (
    <ListContainer>
      {!upcomingEvents ? (
        <>
          <CalendarEventRowLoading showDate />
          <CalendarEventRowLoading showDate />
          <CalendarEventRowLoading showDate />
        </>
      ) : !upcomingEvents.length ? (
        <EmptyList>No events</EmptyList>
      ) : (
        upcomingEvents
          .sort(sort_eventByStartDate("ASC"))
          .map((event) => (
            <CalendarEventRow key={event.id} event={event} showDate />
          ))
      )}
    </ListContainer>
  );
}
