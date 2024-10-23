import { useMemo } from "react";

import { AppBody, AppContainer, AppHeader } from "./components/atoms/AppAtoms";

import type { CalendarEvent } from "./types";
import CalendarEventRow from "./components/CalendarEventRow";
import { IconCalendar, IconCalendarPlus } from "@tabler/icons-react";
import Button from "./components/Button";

function App() {
  const calendarEvents = useMemo<CalendarEvent[]>(
    () => [
      {
        title: "Make lunch",
        description: "Make some lunch so that I don't go hungry",
        start: new Date(),
        end: new Date(),
        allDay: false,
      },
    ],
    [],
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
          <Button $type="action">
            <IconCalendarPlus size="1em" /> Add event
          </Button>
        </header>
        <div>
          {calendarEvents.map((event) => (
            <CalendarEventRow event={event} />
          ))}
        </div>
      </AppBody>
    </AppContainer>
  );
}

export default App;
