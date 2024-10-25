import {
  CalendarDate,
  CalendarDetail,
  CalendarRowContainer,
  CalendarTime,
} from "./atoms/CalendarEventRowAtoms";
import { BoxLoader, TextLoader } from "./ContentLoader";

export default function CalendarEventRowLoading({
  showDate = false,
  oneLine = false,
}: {
  showDate?: boolean;
  oneLine?: boolean;
}) {
  return (
    <CalendarRowContainer $showDate={showDate}>
      {showDate && (
        <CalendarDate>
          <BoxLoader width={18} height={12} />
          <BoxLoader width={32} height={28} />
        </CalendarDate>
      )}

      <CalendarTime>
        <TextLoader width={120} />
      </CalendarTime>
      <CalendarDetail $oneLine={oneLine}>
        <TextLoader width={120} />
        <TextLoader width={240} />
      </CalendarDetail>
    </CalendarRowContainer>
  );
}
