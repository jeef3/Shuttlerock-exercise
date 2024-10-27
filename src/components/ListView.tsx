import { useMemo } from "react";

import { sort_eventByStartDate } from "../util/date";
import {
  reduce_bucketByMonth,
  sort_bucketByMonth,
} from "../util/calendarEvents";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { ListContainer } from "./atoms/CalendarEventRowAtoms";
import { EmptyList } from "./atoms/EmptyList";
import CalendarEventRow from "./CalendarEventRow";
import CalendarEventRowLoading from "./CalendarEventRowLoading";

const locales = navigator.languages;
const formatter = new Intl.DateTimeFormat(locales, { month: "long" });

export default function ListView() {
  const { data: calendarEvents } = useCalendarEvents();

  const upcomingEvents = useMemo(() => {
    if (!calendarEvents) return [];

    const now = new Date();

    return calendarEvents
      .filter((event) => new Date(event.end).getTime() > now.getTime())
      .reduce(reduce_bucketByMonth, [])
      .sort(sort_bucketByMonth("ASC"));
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
        upcomingEvents.map((bucket) => (
          <ListContainer>
            <h3>{formatter.format(bucket.month)}</h3>

            {bucket.calendarEvents
              .sort(sort_eventByStartDate("ASC"))
              .map((event) => (
                <CalendarEventRow key={event.id} event={event} showDate />
              ))}
          </ListContainer>
        ))
      )}
    </ListContainer>
  );
}
