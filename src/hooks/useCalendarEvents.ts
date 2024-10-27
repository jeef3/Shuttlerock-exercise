import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../api";
import { external } from "../external";
import type { CalendarEvent, CalendarEventViewModel } from "../types";

export function useCalendarEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const results = await Promise.all([
        api.events.list(),

        // TODO: Cache this one
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
    mutationFn: async (event: CalendarEventViewModel) => {
      const { repeat, ...eventOnly } = event;

      const result = await (event.id
        ? api.events.update(eventOnly)
        : api.events.create(eventOnly, repeat));

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

export function useRecurrence(id?: string) {
  return useQuery({
    queryKey: ["recurrences", id],
    queryFn: () => api.recurrences.details(id!),
    enabled: !!id,
  });
}
