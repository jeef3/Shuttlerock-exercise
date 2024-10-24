import { CalendarEvent } from "./types";

const BASE_URL = "http://localhost:3000";

const url = (path: string) => `${BASE_URL}${path}`;

export const api = {
  async events() {
    return fetch(url("/events")).then((r) => r.json()) as Promise<
      CalendarEvent[]
    >;
  },
};
