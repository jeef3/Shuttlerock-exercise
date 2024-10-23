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

        display: "flex",
        gap: 8,
      }}
    >
      <div
        style={{
          margin: "8px 0",
          padding: "4px 16px",
          borderRight: "solid 1px hsl(0 0% 90%)",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ lineHeight: 1, fontSize: 12, fontWeight: 600 }}>
          {event.start.toLocaleDateString(locales, { weekday: "short" })}
        </div>
        <div style={{ lineHeight: 1, fontSize: 28, fontWeight: 700 }}>
          {event.start.getDate()}
        </div>
      </div>

      <div
        style={{
          margin: "8px 0",
          padding: "4px 16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TimeSpan start={event.start} end={event.end} />
      </div>

      <div
        style={{
          margin: "8px 0",
          padding: "4px 16px",
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600 }}>{event.title}</div>
        <div style={{ fontSize: 12, color: "hsl(0 0% 70%)" }}>
          {event.description}
        </div>
      </div>

      <div>
        <Button>
          <IconPencil size="1em" />
        </Button>
      </div>
    </div>
  );
}
