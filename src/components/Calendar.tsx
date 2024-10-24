import { RenderProps as CalendarProps } from "dayzed";
import { Fragment, useId } from "react";

import Button from "./Button";
import {
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleFilled,
} from "@tabler/icons-react";

const d = new Date("2020-02-29");
const DAYS = Array.from({ length: 7 }).map(() => {
  d.setDate(d.getDate() + 1);
  return {
    narrow: d.toLocaleString("default", { weekday: "narrow" }),
    long: d.toLocaleString("default", { weekday: "long" }),
  };
});

const m = new Date();
const MONTHS = Array.from({ length: 12 }).map((_, i) => {
  m.setMonth(i);
  return m.toLocaleString("default", { month: "long" });
});

export default function Calendar({
  control: { calendars, getBackProps, getForwardProps, getDateProps },
  onTodayClick,
}: {
  control: CalendarProps;
  onTodayClick: () => void;
}) {
  const id = useId();

  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gap: "8px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {calendars.map((calendar) => (
        <div
          key={`${calendar.year}${calendar.month}`}
          style={{
            display: "grid",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2
              id={`calendar-label-${id}`}
              style={{ margin: 0, flexGrow: 1, fontSize: 18, fontWeight: 600 }}
              aria-live="polite"
            >
              {MONTHS[calendar.month]} {calendar.year}
            </h2>
            <div
              style={{
                color: "lime",
                display: "flex",
              }}
            >
              <Button
                $type="transparent"
                {...getBackProps({ calendars })}
                aria-label="Previous month"
              >
                <IconChevronsLeft size="1em" />
              </Button>
              <Button
                $type="transparent"
                onClick={onTodayClick}
                aria-label="Current month"
              >
                <IconCircleFilled size="1em" />
              </Button>
              <Button
                $type="transparent"
                {...getForwardProps({
                  calendars,
                })}
                aria-label="Next month"
              >
                <IconChevronsRight size="1em" />
              </Button>
            </div>
          </div>

          <div
            style={{
              paddingBottom: 8,
              borderBottom: `solid 1px hsl(0 0% 90%)`,
              display: "grid",
              gridTemplateColumns: "repeat(7, 30px)",
              justifyItems: "center",
            }}
            role="grid"
            aria-labelledby={`calendar-label-${id}`}
          >
            {DAYS.map((day, i) => (
              <div
                key={`${calendar.year}${calendar.month}${i}`}
                style={{
                  color: "hsl(0 0% 50%)",
                  fontSize: 13,
                  fontWeight: 700,
                }}
                title={day.long}
              >
                {day.narrow}
              </div>
            ))}
          </div>

          <div>
            {calendar.weeks.map((week, weekIndex) => (
              <div
                key={`${calendar.year}${calendar.month}${weekIndex}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 30px)",
                }}
              >
                {week.map((d, dateIndex) => {
                  return (
                    <Fragment
                      key={`${calendar.year}${calendar.month}${weekIndex}${dateIndex}`}
                    >
                      {d ? (
                        <Button
                          $type="transparent"
                          tabIndex={d.today ? 0 : -1}
                          {...getDateProps({ dateObj: d })}
                          style={{
                            fontStyle: "normal",
                            fontWeight: d.selected
                              ? 600
                              : d.prevMonth || d.nextMonth
                                ? 300
                                : 400,
                            color: d.selected
                              ? "white"
                              : d.today
                                ? "hsl(0 50% 50%)"
                                : d.prevMonth || d.nextMonth || !d.selectable
                                  ? "hsl(0 0% 80%)"
                                  : "inherit",
                            background: d.selected ? "hsl(220 85% 35%)" : "",
                            outline: 0,
                          }}
                          aria-selected={d.today}
                          aria-pressed={d.today}
                        >
                          {d.date.getDate()}
                        </Button>
                      ) : (
                        <div />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
