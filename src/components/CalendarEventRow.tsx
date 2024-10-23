import { IconPencil } from "@tabler/icons-react";
import type { CalendarEvent } from "../types";
import Button from "./Button";
import TimeSpan from "./TimeSpan";

const locales = navigator.languages;

export default function CalendarEventRow({ event }: { event: CalendarEvent }) {
  return (
    <div
      style={{
        color: "hsl(0 0% 20%)",
        border: "solid 1px hsl(0 0% 90%)",
        borderRadius: 8,

        background: "white",

        display: "grid",
        columnGap: 16,
        gridTemplateColumns: "[date] auto [time] auto [detail] 1fr [edit] auto",
        alignItems: "center",
      }}
    >
      <div
        style={{
          gridArea: "date",

          margin: "8px 0",
          padding: "4px 18px",

          color: "hsl(0 0% 30%)",
          borderRight: "solid 1px hsl(0 0% 90%)",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            lineHeight: 1,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {event.start.toLocaleDateString(locales, { weekday: "short" })}
        </div>
        <div style={{ lineHeight: 1, fontSize: 28, fontWeight: 700 }}>
          {event.start.getDate()}
        </div>
      </div>

      <div
        style={{
          gridArea: "time",

          display: "flex",
          alignItems: "center",
        }}
      >
        <TimeSpan start={event.start} end={event.end} />
      </div>

      <div
        style={{
          gridArea: "detail",

          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600 }}>{event.title}</div>
        <div style={{ fontSize: 12, color: "hsl(0 0% 70%)" }}>
          {event.description}
        </div>
      </div>

      <div style={{ gridArea: "edit", alignSelf: "start", padding: 8 }}>
        <Button>
          <IconPencil size="1em" />
        </Button>
      </div>
    </div>
  );
}
