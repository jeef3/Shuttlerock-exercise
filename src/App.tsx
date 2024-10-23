import { useCallback, useMemo } from "react";
import { useModal } from "react-modal-hook";

import { AppBody, AppContainer, AppHeader } from "./components/atoms/AppAtoms";

import type { CalendarEvent } from "./types";
import CalendarEventRow from "./components/CalendarEventRow";
import { IconCalendar, IconCalendarPlus } from "@tabler/icons-react";
import Button from "./components/Button";
import AddEditEventModal from "./modals/AddEditEventModal";

function App() {
  const calendarEvents = useMemo<CalendarEvent[]>(
    () => [
      {
        id: "f6764e3f-e614-45f7-931b-9a078407315a",
        title: "Make lunch",
        description: "Make some lunch so that I don't go hungry",
        start: new Date(),
        end: new Date(),
        allDay: false,
      },
      {
        id: "b19c5021-0ffc-4d6a-901b-c038b51399bc",
        title: "Make lunch",
        description: "Make some lunch so that I don't go hungry",
        start: new Date(),
        end: new Date(),
        allDay: false,
      },
    ],
    [],
  );

  const [showAddEditEventModal, closeAddEdeitEventModal] = useModal(
    () => <AddEditEventModal />,
    [],
  );

  const handleAddClick = useCallback(() => {}, []);

  const handleEditClick = useCallback(
    (event: CalendarEvent) => {
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
          {calendarEvents.map((event) => (
            <CalendarEventRow
              key={event.title}
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
