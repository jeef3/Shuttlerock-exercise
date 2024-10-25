import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../api";
import { external } from "../external";
import type { CalendarEvent, RecurrenceFrequency } from "../types";

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
    mutationFn: async (event: CalendarEvent) => {
      const result = await (event.id
        ? api.events.update(event)
        : api.events.create(event));

      return result;
    },
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
