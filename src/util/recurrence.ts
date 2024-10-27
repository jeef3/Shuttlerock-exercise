import { RecurrenceFrequency } from "../types";

const COUNT = 10;

export function generateRecurring(
  date: Date,
  recurrence: RecurrenceFrequency,
): Date[] {
  if (recurrence === "weekly") {
    return Array.from(new Array(COUNT - 1)).reduce(
      (p) => {
        const nextDate = new Date(p[p.length - 1]);
        nextDate.setDate(nextDate.getDate() + 7);

        return [...p, nextDate];
      },
      [date],
    );
  }

  if (recurrence === "monthly") {
    return Array.from(new Array(COUNT - 1)).reduce(
      (p, _d, i) => {
        const current = p[p.length - 1];

        const nextDate = new Date(current);
        nextDate.setMonth(nextDate.getMonth() + 1, date.getDate());

        // JavaScript will adjust the month for invalid dates if they go over.
        // We need to clamp to the last day of the month.
        if (nextDate.getMonth() !== current.getMonth() + 1) {
          const clampedDate = new Date(date);
          clampedDate.setMonth(clampedDate.getMonth() + 2 + i, 0);

          return [...p, clampedDate];
        }

        return [...p, nextDate];
      },
      [date],
    );
  }

  if (recurrence === "yearly") {
    return Array.from(new Array(COUNT - 1)).reduce(
      (p) => {
        const nextDate = new Date(p[p.length - 1]);
        nextDate.setFullYear(nextDate.getFullYear() + 1);

        return [...p, nextDate];
      },
      [date],
    );
  }

  return [];
}
