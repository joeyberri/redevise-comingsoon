import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { cn } from "../utils/cn";
import { Heading, Text } from "./Typography.jsx";

const HeadlessCalendar = ({ onSelectSlot, isBooking }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_CAL_API_KEY;
  const EVENT_TYPE_ID = import.meta.env.VITE_CAL_EVENT_TYPE_ID;

  const daysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const fetchAvailability = async (date) => {
    if (!API_KEY || !EVENT_TYPE_ID) {
      setError("Calendar not configured yet.");
      return;
    }

    setLoading(true);
    setError(null);
    setSlots([]);

    try {
      // Build timezone-safe date string
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      // Cal.com v2 API — GET /v2/slots
      // In dev: Vite proxy handles CORS, API key passed as query param
      // In prod: Cloudflare function injects Bearer auth from server env
      const params = new URLSearchParams({
        eventTypeId: EVENT_TYPE_ID,
        start: dateString,
        end: dateString,
        timeZone: "Africa/Lagos",
      });

      const response = await fetch(`/cal-api/v2/slots?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "cal-api-version": "2024-09-04",
        },
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();

      // v2 response: { status: "success", data: { "YYYY-MM-DD": [{ start: "..." }] } }
      const daySlots = data?.data?.[dateString] ?? [];
      const formatted = daySlots.map((s) => ({
        time: new Date(s.start).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Africa/Lagos",
        }),
        isoTime: s.start,
      }));
      setSlots(formatted);
    } catch (err) {
      console.error("Cal.com API Error:", err);
      setError("Couldn't load times. Try another date.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
    setSlots([]);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
    setSlots([]);
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const offset = firstDayOfMonth(currentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < offset; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-full" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        d
      );
      const isPast = date < today;
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <button
          key={d}
          disabled={isPast}
          onClick={() => setSelectedDate(date)}
          className={cn(
            "relative h-10 w-full rounded-xl flex items-center justify-center text-sm font-medium transition-all",
            isPast
              ? "opacity-15 cursor-not-allowed"
              : "hover:bg-lime/10 hover:text-lime cursor-pointer",
            isSelected
              ? "bg-lime text-dark-100 shadow-[0_0_20px_rgba(190,255,80,0.3)]"
              : "text-text/60"
          )}
        >
          {d}
          {isSelected && (
            <motion.div
              layoutId="active-day"
              className="absolute inset-0 border-2 border-lime rounded-xl pointer-events-none"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="flex flex-col">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col">
          <Text variant="tiny" className="text-lime uppercase tracking-widest">
            {selectedDate
              ? selectedDate.toLocaleDateString("en-US", { weekday: "long" })
              : "Pick a date"}
          </Text>
          <Heading level={4} className="text-xl">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Heading>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full border border-text/10 hover:bg-text/5 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full border border-text/10 hover:bg-text/5 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Day Grid */}
      <div className="relative grid grid-cols-7 gap-1 mb-3 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="text-[10px] font-bold text-text/20 uppercase py-1.5"
          >
            {day}
          </div>
        ))}
        {renderDays()}
      </div>

      {/* Time Slots */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={selectedDate.toDateString()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col pt-5 border-t border-text/10"
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock size={13} className="text-lime" />
              <Text
                variant="tiny"
                className="text-text/40 font-bold uppercase tracking-widest"
              >
                Available times
              </Text>
            </div>

            <div 
              data-lenis-prevent
              className="grid grid-cols-2 gap-2 pb-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar overscroll-contain touch-pan-y"
            >
              {loading ? (
                <div className="col-span-2 py-6 flex justify-center">
                  <div className="size-5 border-2 border-lime/20 border-t-lime rounded-full animate-spin" />
                </div>
              ) : slots.length > 0 ? (
                slots.map((slot, i) => (
                  <button
                    key={i}
                    disabled={isBooking}
                    onClick={() =>
                      onSelectSlot({
                        date: selectedDate,
                        time: slot.time,
                        isoTime: slot.isoTime,
                      })
                    }
                    className={cn(
                      "p-3 rounded-xl border border-text/10 bg-text/[0.02] hover:border-lime/50 hover:bg-lime/5 transition-all text-center group",
                      isBooking && "opacity-50 pointer-events-none"
                    )}
                  >
                    <span className="font-bold text-sm group-hover:text-lime transition-colors">
                      {slot.time}
                    </span>
                  </button>
                ))
              ) : (
                <div className="col-span-2 text-center py-6 text-text/40 text-sm italic">
                  No times available for this day.
                </div>
              )}
            </div>

            {error && (
              <div className="text-[10px] text-lime/50 text-center uppercase tracking-widest mt-1">
                {error}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeadlessCalendar;
