import type { CalendarEvent, MoonPhase } from "./types";

function getPhaseName(phase: MoonPhase) {
  switch (phase.Phase) {
    case 0:
      return "🌑 New moon";
    case 1:
      return "🌓 First quarter";
    case 2:
      return "🌕 Full moon";
    case 3:
      return "🌗 Last quarter";
    default:
      return "Unknown";
  }
}

function moonPhaseToEvent(phase: MoonPhase): CalendarEvent {
  return {
    id: `phase-${phase.Date}-${phase.Phase}`,

    title: getPhaseName(phase),
    description: "",

    start: phase.Date,
    end: phase.Date,

    external: true,
  };
}

export const external = {
  async moonPhase(year: string) {
    return fetch(
      ` https://craigchamberlain.github.io/moon-data/api/moon-phase-data/${year}/`,
    )
      .then((r) => r.json())
      .then((results) => results.map(moonPhaseToEvent));
  },
};
