import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../api";
import { CalendarEvent } from "../types";
import { external } from "../external";

export function useCalendarEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const results = await Promise.all([
        api.events.list(),
        external.moonPhase("2024"),
      ]);

      return results.flat();
    },
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
