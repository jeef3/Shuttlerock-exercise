import { CalendarEvent } from "./types";

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

    async create(event: CalendarEvent) {
      return send<CalendarEvent>("/events", "POST", event);
    },

    async update(event: CalendarEvent) {
      return send<CalendarEvent>(`/events/${event.id}`, "PUT", event);
    },

    async delete(id: string) {
      return send(`/events/${id}`, "DELETE");
    },
  },
};
