import { useCallback, useMemo, useState } from "react";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { filter_eventsByDate } from "../util/date";
import { ListContainer } from "./atoms/CalendarEventRowAtoms";
import CalendarEventRow from "./CalendarEventRow";
import Button from "./Button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import DayPicker from "./DayPicker";
import { EmptyList } from "./atoms/EmptyList";
import CalendarEventRowLoading from "./CalendarEventRowLoading";

export default function DayView() {
  const { data: calendarEvents } = useCalendarEvents();

  const [date, setDate] = useState<Date>(new Date());

  const dayEvents = useMemo(
    () => calendarEvents?.filter(filter_eventsByDate(date)),
    [calendarEvents, date],
  );

  const handlePreviousClick = useCallback(
    () =>
      setDate((c) => {
        const updated = new Date(c);
        updated.setDate(updated.getDate() - 1);

        return updated;
      }),
    [],
  );

  const handleNextClick = useCallback(
    () =>
      setDate((c) => {
        const updated = new Date(c);
        updated.setDate(updated.getDate() + 1);

        return updated;
      }),
    [],
  );

  return (
    <div>
      <div
        style={{
          marginBottom: 16,

          display: "grid",
          gridTemplateColumns: "auto 180px auto",
          gap: 8,
          justifyContent: "center",
          justifyItems: "stretch",
          alignItems: "center",
        }}
      >
        <Button onClick={handlePreviousClick} title="Previous day">
          <IconChevronLeft size="19px" />
        </Button>
        <DayPicker date={date} onChange={setDate} />
        <Button onClick={handleNextClick} title="Next day">
          <IconChevronRight size="19px" />
        </Button>
      </div>

      <ListContainer>
        {!dayEvents ? (
          <>
            <CalendarEventRowLoading oneLine />
            <CalendarEventRowLoading oneLine />
            <CalendarEventRowLoading oneLine />
          </>
        ) : !dayEvents.length ? (
          <EmptyList>No events today</EmptyList>
        ) : (
          dayEvents.map((event) => (
            <CalendarEventRow key={event.id} event={event} oneLine />
          ))
        )}
      </ListContainer>
    </div>
  );
}
