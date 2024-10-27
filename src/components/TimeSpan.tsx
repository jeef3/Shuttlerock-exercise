import { IconClockHour4Filled } from "@tabler/icons-react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const FORMAT_OPTIONS: Intl.DateTimeFormatOptions = { timeStyle: "short" };

export default function TimeSpan({
  start,
  end,
  hour12 = true,
}: {
  start: Date;
  end: Date;
  hour12?: boolean;
}) {
  const locales = navigator.languages;

  return (
    <Container>
      <IconClockHour4Filled size="1em" />
      {start.toLocaleTimeString(locales, {
        ...FORMAT_OPTIONS,
        hour12,
      })}
      <span>&ndash;</span>
      {end.toLocaleTimeString(locales, {
        ...FORMAT_OPTIONS,
        hour12,
      })}
    </Container>
  );
}
