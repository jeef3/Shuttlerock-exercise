import { useCallback, useState } from "react";
import { useModal } from "react-modal-hook";
import {
  IconCalendar,
  IconCalendarMonth,
  IconCalendarPlus,
  IconCalendarWeek,
  IconListDetails,
} from "@tabler/icons-react";

import { AppBody, AppContainer, AppHeader } from "./components/atoms/AppAtoms";
import Button from "./components/Button";
import AddEditEventModal from "./modals/AddEditEventModal";
import ButtonGroup from "./components/ButtonGroup";
import DayView from "./components/DayView";
import ListView from "./components/ListView";

type ViewState = "day" | "list" | "week" | "month";

function App() {
  const [view, setView] = useState<ViewState>("day");

  const [showAddEditEventModal, closeAddEdeitEventModal] = useModal(
    () => <AddEditEventModal onClose={closeAddEdeitEventModal} />,
    [],
  );

  const handleAddClick = useCallback(() => {
    showAddEditEventModal();
  }, [showAddEditEventModal]);

  return (
    <AppContainer>
      <AppHeader>
        <h1>Calendar</h1>

        <Button $type="action" onClick={handleAddClick}>
          <IconCalendarPlus size="1em" /> Add event
        </Button>
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

          <ButtonGroup>
            <Button $active={view === "day"} onClick={() => setView("day")}>
              <IconCalendar size="1em" /> Day
            </Button>
            <Button $active={view === "list"} onClick={() => setView("list")}>
              <IconListDetails size="1em" /> List
            </Button>
            <Button $active={view === "week"} onClick={() => setView("week")}>
              <IconCalendarWeek size="1em" /> Week
            </Button>
            <Button $active={view === "month"} onClick={() => setView("month")}>
              <IconCalendarMonth size="1em" /> Month
            </Button>
          </ButtonGroup>
        </header>

        {view === "day" && <DayView />}
        {view === "list" && <ListView />}
      </AppBody>
    </AppContainer>
  );
}

export default App;
