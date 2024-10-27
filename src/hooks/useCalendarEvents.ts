import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../api";
import { external } from "../external";
import type {
  CalendarEvent,
  CalendarEventViewModel,
  DeleteCalendarEventViewModel,
} from "../types";

function useMoonPhases() {
  return useQuery({
    queryKey: ["moonPhases"],
    queryFn: () => external.moonPhase("2024"),
    staleTime: Infinity,
  });
}

export function useCalendarEvents() {
  const { data: moonPhases } = useMoonPhases();

  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const results = await Promise.all([api.events.list(), moonPhases]);

      return results.flat();
    },
    enabled: !!moonPhases,
  });
}

export function useMutateCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["events"],
    mutationFn: async (event: CalendarEventViewModel) => {
      const { repeat, ...eventOnly } = event;

      const result = await (event.id
        ? api.events.update(eventOnly as CalendarEvent, repeat, false)
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
    mutationFn: (event: DeleteCalendarEventViewModel) =>
      api.events.delete(event.id, event.deleteFutureEvents),
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
