import { describe, expect, test } from "vitest";
import { generateRecurrences } from "./recurrence";

describe("Recurrence", () => {
  describe("generateRecurring", () => {
    test("It generates 10 recurrences", () => {
      const eventDate = new Date();

      const result = generateRecurrences(eventDate, "weekly");

      expect(result.length).toBe(10);
    });

    test("Weekly recurrences are on the same day each week", () => {
      const eventDate = new Date("2024-01-01");

      const result = generateRecurrences(eventDate, "weekly");

      expect(result[0].toISOString().slice(0, 10)).toBe("2024-01-01");
      expect(result[1].toISOString().slice(0, 10)).toBe("2024-01-08");
      expect(result[2].toISOString().slice(0, 10)).toBe("2024-01-15");
      expect(result[3].toISOString().slice(0, 10)).toBe("2024-01-22");
    });

    test("Monthly recurrences are on the same date each month", () => {
      const eventDate = new Date("2024-01-10");

      const result = generateRecurrences(eventDate, "monthly");

      expect(result[0].toISOString().slice(0, 10)).toBe("2024-01-10");
      expect(result[1].toISOString().slice(0, 10)).toBe("2024-02-10");
      expect(result[2].toISOString().slice(0, 10)).toBe("2024-03-10");
      expect(result[3].toISOString().slice(0, 10)).toBe("2024-04-10");
    });

    test("Monthly recurrence dates that don't exist, recure on the last of the month", () => {
      const eventDate = new Date("2024-01-31");

      const result = generateRecurrences(eventDate, "monthly");

      expect(result[0].toISOString().slice(0, 10)).toBe("2024-01-31");
      expect(result[1].toISOString().slice(0, 10)).toBe("2024-02-29");
      expect(result[2].toISOString().slice(0, 10)).toBe("2024-03-31");
      expect(result[3].toISOString().slice(0, 10)).toBe("2024-04-30");
    });

    test("Yearly recurrences are on the same date each year", () => {
      const eventDate = new Date("2024-01-10");

      const result = generateRecurrences(eventDate, "yearly");

      expect(result[0].toISOString().slice(0, 10)).toBe("2024-01-10");
      expect(result[1].toISOString().slice(0, 10)).toBe("2025-01-10");
      expect(result[2].toISOString().slice(0, 10)).toBe("2026-01-10");
      expect(result[3].toISOString().slice(0, 10)).toBe("2027-01-10");
    });
  });
});
