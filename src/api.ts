import { CalendarEvent, Recurrence, RecurrenceFrequency } from "./types";
import { generateRecurring } from "./util/recurrence";

const BASE_URL = "http://localhost:3000";

const url = (path: string) => `${BASE_URL}${path}`;

type Method = "GET" | "POST" | "PUT" | "DELETE";

const send = async <TData extends object, TResponse = TData>(
  path: string,
  method: Method,
  data?: TData,
): Promise<TResponse> => {
  const opts: RequestInit = { method };

  if (data && method !== "GET") {
    opts.body = JSON.stringify(data);
  }

  return fetch(url(path), opts).then((r) => r.json() as TResponse);
};

export const api = {
  events: {
    async list() {
      return send<CalendarEvent[]>("/events", "GET");
    },

    async details(id: string) {
      return send<CalendarEvent>(`/events/${id}`, "GET");
    },

    async create(event: CalendarEvent, repeat?: RecurrenceFrequency) {
      // This would normally be done server-side, and transactional.
      if (repeat) {
        console.log("Repeating", repeat);
        const slots = generateRecurring(new Date(event.start), repeat);

        const recurrence = await send<Partial<Recurrence>, Recurrence>(
          "/recurrences",
          "POST",
          {
            repeat,
            recurrences: [],
          },
        );

        event.recurrenceId = recurrence.id;

        const duration =
          new Date(event.end).getTime() - new Date(event.start).getTime();

        const repeatEvents = [];

        for (const slot of slots) {
          repeatEvents.push({
            ...event,

            start: slot.toISOString(),
            end: new Date(slot.getTime() + duration).toISOString(),
          });
        }

        // Create all the new events
        const updatedEvents = await Promise.all(
          repeatEvents.map((e) => send("/events", "POST", e)),
        );

        // And update the recurrence
        recurrence.recurrences = updatedEvents.map((e) => ({
          calendarEventId: e.id,
          date: e.start,
          modified: false,
        }));

        await send<Recurrence>(
          `/recurrences/${recurrence.id}`,
          "PUT",
          recurrence,
        );

        return updatedEvents[0];
      } else {
        return send<CalendarEvent>("/events", "POST", event);
      }
    },

    async update(event: CalendarEvent) {
      return send<CalendarEvent>(`/events/${event.id}`, "PUT", event);
    },

    async delete(id: string) {
      return send(`/events/${id}`, "DELETE");
    },
  },

  recurrences: {
    async list() {
      return send<Recurrence[]>("/recurrences", "GET");
    },

    async details(id: string) {
      return send<Recurrence>(`/recurrences/${id}`, "GET");
    },

    async create(recurrence: Recurrence) {
      return send<Recurrence>("/recurrences", "POST", recurrence);
    },

    async update(recurrence: Recurrence) {
      return send<Recurrence>(
        `/recurrences/${recurrence.id}`,
        "PUT",
        recurrence,
      );
    },

    async delete(id: string) {
      return send(`/recurrences/${id}`, "DELETE");
    },
  },
};
