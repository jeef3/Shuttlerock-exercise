import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../api";
import { CalendarEvent } from "../types";

export function useCalendarEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => api.events.list(),
  });
}

export function useMutateCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["events"],
    mutationFn: (event: CalendarEvent) =>
      event.id ? api.events.update(event) : api.events.create(event),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useDeleteCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["events"],
    mutationFn: (event: CalendarEvent) => api.events.delete(event.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}
