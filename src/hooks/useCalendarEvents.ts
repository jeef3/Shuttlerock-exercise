import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "../api";

export function useCalendarEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => api.events.list(),
  });
}

export function useMutateCalendarEvent() {
  return useMutation({
    mutationKey: ["events"],
    mutationFn: (event) => api.events.update(event),
  });
}
