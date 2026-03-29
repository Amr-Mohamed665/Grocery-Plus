import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const windows = [
  { label: "Morning", time: "8:00 AM - 12:00 PM" },
  { label: "Afternoon", time: "12:00 PM - 5:00 PM" },
  { label: "Evening", time: "5:00 PM - 9:00 PM" },
];

export default function Delivery() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2 font-semibold">
        <Clock className="h-4 w-4 text-[#0f3d3e]" />
        Preferred Delivery Windows
      </div>
      <p className="text-sm text-gray-600 sm:ml-6">
        Select your Preferred time slots for deliveries
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {windows.map((item, index) => (
          <button
            key={item.label}
            className={cn(
              "rounded-lg border p-4 text-left transition w-full",
              "text-sm sm:text-xs",
              index === 2
                ? "border-[#0f3d3e] bg-[#0f3d3e]/5"
                : "hover:bg-slate-50",
            )}
          >
            <p className="font-medium">{item.label}</p>
            <p className="text-xs text-slate-500">{item.time}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
