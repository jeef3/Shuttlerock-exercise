import { useCallback, useState } from "react";
import { useModal } from "react-modal-hook";
import { IconCalendar, IconCalendarPlus } from "@tabler/icons-react";

import { AppBody, AppContainer, AppHeader } from "./components/atoms/AppAtoms";
import CalendarEventRow from "./components/CalendarEventRow";
import Button from "./components/Button";
import AddEditEventModal from "./modals/AddEditEventModal";
import { useCalendarEvents } from "./hooks/useCalendarEvents";

import type { CalendarEvent } from "./types";
import { sort_eventByStartDate } from "./util/date";

function App() {
  const { data: calendarEvents } = useCalendarEvents();

  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null);

  const [showAddEditEventModal, closeAddEdeitEventModal] = useModal(
    () => (
      <AddEditEventModal
        event={currentEvent}
        onClose={closeAddEdeitEventModal}
      />
    ),
    [currentEvent],
  );

  const handleAddClick = useCallback(() => {
    setCurrentEvent(null);
    showAddEditEventModal();
  }, [showAddEditEventModal]);

  const handleEditClick = useCallback(
    (event: CalendarEvent) => {
      setCurrentEvent(event);
      showAddEditEventModal();
    },
    [showAddEditEventModal],
  );

  return (
    <AppContainer>
      <AppHeader>
        <h1>Calendar</h1>
      </AppHeader>

      <AppBody>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ alignItems: "center", display: "flex", gap: 2 }}>
            <IconCalendar size="1em" />
            Upcoming Events
          </h2>
          <Button $type="action" onClick={handleAddClick}>
            <IconCalendarPlus size="1em" /> Add event
          </Button>
        </header>
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
                  <CalendarEventRow
                    key={event.id}
                    event={event}
                    onEditClick={() => handleEditClick(event)}
                  />
                ))}
        </div>
      </AppBody>
    </AppContainer>
  );
}

export default App;
