import { IconClockHour4Filled } from "@tabler/icons-react";

const locales = navigator.languages;

export default function TimeSpan({ start, end }: { start: Date; end: Date }) {
  return (
    <div
      style={{
        color: "hsl(0 0% 70%)",
        fontSize: 12,
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconClockHour4Filled size="1em" />
      {start.toLocaleTimeString(locales, {
        timeStyle: "short",
        hour12: false,
      })}{" "}
      –{" "}
      {end.toLocaleTimeString(locales, {
        timeStyle: "short",
        hour12: false,
      })}
    </div>
  );
}
