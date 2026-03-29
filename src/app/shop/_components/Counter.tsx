import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import heroImage from "@/assets/authBg.png"

export default function Counter() {
  const [time, setTime] = useState({
    days: 2,
    hours: 24,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {String(value)
          .padStart(2, "0")
          .split("")
          .map((digit, i) => (
            <div
              key={i}
              className="bg-white w-9 text-gray-900 rounded-2xl px-3 py-2 text-2xl font-semibold"
            >
              {digit}
            </div>
          ))}
      </div>
      <p className="text-white mt-2 text-sm">{label}</p>
    </div>
  );

  return (
    <div className="bg-[#014162E5] rounded-lg p-12 mb-8 relative overflow-hidden">
        <Image
          src={heroImage}
          alt="hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#08415fee]"></div>
      <div className="relative text-center">
        <h2 className="text-3xl mb-2">
          <span className="text-white">Winter</span>{" "}
          <span className="text-white">Discount</span>
        </h2>
        <p className="text-white mb-8">Get 60% off - Limited Time Offer</p>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <TimeBox value={time.days} label="Days" /> 
          <TimeBox value={time.hours} label="Hours" />
          <TimeBox value={time.minutes} label="Minutes" />
          <TimeBox value={time.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
}
