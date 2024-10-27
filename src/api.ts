import { Calendar } from "dayzed";
import { CalendarEvent, Recurrence, RecurrenceFrequency } from "./types";
import { generateRecurrences } from "./util/recurrence";
import { recurrenceService } from "./util/recurrenceService";

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

    async create(
      event: Omit<CalendarEvent, "id">,
      repeat?: RecurrenceFrequency,
    ): Promise<CalendarEvent> {
      if (repeat) {
        const recurrence = await api.recurrences.create({
          frequency: repeat,
          recurrences: [],
        });

        const { eventsToCreate } = recurrenceService.createRecurringEvent(
          recurrence,
          event,
        );

        // Create all the new events
        const createdEvents = await Promise.all(
          eventsToCreate.map((e) => api.events.create(e)),
        );

        // And update the recurrence
        recurrence.recurrences = createdEvents.map((e) => ({
          calendarEventId: e.id,
          date: e.start,
          modified: false,
        }));

        await api.recurrences.update(recurrence);

        return createdEvents[0];
      } else {
        return send<Omit<CalendarEvent, "id">, CalendarEvent>(
          "/events",
          "POST",
          event,
        );
      }
    },

    async update(
      event: CalendarEvent,
      repeat?: RecurrenceFrequency,
      thisEventOnly: boolean = true,
    ) {
      if (thisEventOnly) {
        if (event.recurrenceId) {
          const recurrence = await api.recurrences.details(event.recurrenceId);

          const index = recurrence.recurrences.findIndex(
            (r) => r.calendarEventId === event.id,
          );
          recurrence.recurrences[index].modified = true;

          await api.recurrences.update(recurrence);
        }

        return send<CalendarEvent>(`/events/${event.id}`, "PUT", event);
      }

      if (repeat) {
        const recurrence = await (event.recurrenceId
          ? api.recurrences.details(event.recurrenceId)
          : api.recurrences.create({
              frequency: repeat,
              recurrences: [],
            }));

        if (repeat != recurrence.frequency) {
          // TODO: The frequency has changed or is newly created. Generate the
          // repeats.
        }

        const recurrencesToUpdate = recurrence.recurrences.filter(
          (r) =>
            !thisEventOnly ||
            new Date(r.date).getTime() > new Date(event.start).getTime(),
        );

        const updatedEvents = await Promise.all(
          recurrencesToUpdate.map(async (r) => {
            const existing = await api.events.details(r.calendarEventId);

            return send<CalendarEvent>(`/events/${existing.id}`, "PUT", {
              ...existing,
              title: event.title,
              description: event.description,
            });
          }),
        );

        return updatedEvents[0];
      } else if (!repeat && event.recurrenceId) {
        // This event _was_ repeating, now we're removing that.
        const recurrence = await api.recurrences.details(event.recurrenceId);

        // Delete all recurrences after this events date
      } else {
        return send<CalendarEvent>(`/events/${event.id}`, "PUT", event);
      }
    },

    async delete(id: string, deleteFutureEvents: boolean = false) {
      const calendarEvent = await api.events.details(id);

      if (calendarEvent.recurrenceId) {
        const recurrence = await api.recurrences.details(
          calendarEvent.recurrenceId,
        );

        const { updatedRecurrences, eventsToDelete } =
          recurrenceService.deleteRecurringEvent(
            recurrence,
            id,
            deleteFutureEvents,
          );

        if (!updatedRecurrences) {
          await api.recurrences.delete(recurrence.id);
        } else {
          await api.recurrences.update({
            ...recurrence,
            recurrences: updatedRecurrences,
          });
        }

        await Promise.all(
          eventsToDelete.map((eventId) => send(`/events/${eventId}`, "DELETE")),
        );
      } else {
        return send(`/events/${id}`, "DELETE");
      }
    },
  },

  recurrences: {
    async list() {
      return send<Recurrence[]>("/recurrences", "GET");
    },

    async details(id: string) {
      return send<Recurrence>(`/recurrences/${id}`, "GET");
    },

    async create(recurrence: Omit<Recurrence, "id">) {
      return send<Omit<Recurrence, "id">, Recurrence>(
        "/recurrences",
        "POST",
        recurrence,
      );
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
