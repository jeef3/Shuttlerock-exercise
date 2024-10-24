import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "../api";

export function useCalendarEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => api.events(),
  });
}

export function useMutateCalendarEvents() {
  return useMutation({
    mutationKey: ["events"],
    mutationFn: () => api.events(),
  });
}
