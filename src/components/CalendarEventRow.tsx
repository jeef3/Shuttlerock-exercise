import { IconPencil } from "@tabler/icons-react";
import type { CalendarEvent } from "../types";
import Button from "./Button";
import TimeSpan from "./TimeSpan";
import { MouseEventHandler } from "react";

const locales = navigator.languages;

export default function CalendarEventRow({
  event,
  onEditClick,
}: {
  event: CalendarEvent;
  onEditClick?: MouseEventHandler;
}) {
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
          {new Date(event.start).toLocaleDateString(locales, {
            weekday: "short",
          })}
        </div>
        <div style={{ lineHeight: 1, fontSize: 28, fontWeight: 700 }}>
          {new Date(event.start).getDate()}
        </div>
      </div>

      <div
        style={{
          gridArea: "time",

          display: "flex",
          alignItems: "center",
        }}
      >
        <TimeSpan start={new Date(event.start)} end={new Date(event.end)} />
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
        <Button onClick={onEditClick}>
          <IconPencil size="1em" />
        </Button>
      </div>
    </div>
  );
}
