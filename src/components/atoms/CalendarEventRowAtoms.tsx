import styled from "styled-components";

export const CalendarRowContainer = styled.div`
  color: hsl(0 0% 20%);

  border: solid 1px hsl(0 0% 90%);
  border-radius: 8px;
  background: white;

  display: grid;
  column-gap: 16px;
  grid-template-columns: [date] auto [time] auto [detail] 1fr [edit] auto;
  align-items: center;
`;

export const CalendarDate = styled.div<{ today?: boolean }>`
  grid-area: date;

  margin: 8px 0;
  padding: 4px 18px;

  color: ${({ today = false }) => (today ? "hsl(0 50% 50%)" : "hsl(0 0% 30%)")};
  border-right: solid 1px hsl(0 0% 90%);

  display: flex;
  flex-direction: column;
  align-items: center;
`;
