import { useDayzed } from "dayzed";
import { useState } from "react";
import { useLayer } from "react-laag";
import { AnimatePresence, motion } from "framer-motion";

import Button from "./Button";
import Calendar from "./Calendar";
import { isToday } from "../util/date";

export default function DatPicker({
  date,
  onChange,
}: {
  date: Date;
  onChange?: (date: Date) => void;
}) {
  const [offset, setOffset] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const control = useDayzed({
    date: date ?? new Date(),
    selected: date ?? undefined,
    showOutsideDays: true,
    offset,
    onOffsetChanged: (o) => {
      setOffset(o);
    },
    onDateSelected: (selected) => {
      setIsOpen(false);
      onChange?.(selected.date);
      setOffset(0);
    },
  });

  const { renderLayer, triggerProps, layerProps, layerSide } = useLayer({
    isOpen: isOpen,
    onOutsideClick: () => setIsOpen((open) => !open),
    auto: true,
    placement: "bottom-start",
    triggerOffset: 8,
  });

  return (
    <>
      <Button
        {...triggerProps}
        onClick={() => setIsOpen(true)}
        style={{
          color: isToday(date) ? "hsl(0 50% 50%)" : "",
          fontWeight: isToday(date) ? 600 : "",
        }}
      >
        {date.toDateString()}
      </Button>
      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              {...layerProps}
              style={{
                ...layerProps.style,
                overflow: "hidden",
                padding: 16,
                borderRadius: 20,
                border: `solid 1px hsl(0 0% 90%)`,
                background: "white",
                boxShadow: "0 20px 20px hsl(0 0% 0% / 25%)",

                ...(layerSide === "top" && {
                  transformOrigin: "bottom",
                }),

                ...(layerSide === "bottom" && {
                  transformOrigin: "top",
                }),
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              aria-modal
            >
              <Calendar
                key="calendars"
                control={control}
                onTodayClick={() => setOffset(0)}
              />
            </motion.div>
          )}
        </AnimatePresence>,
      )}
    </>
  );
}
