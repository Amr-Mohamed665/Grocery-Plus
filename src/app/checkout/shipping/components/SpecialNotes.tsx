import { Input } from "@/components/ui/input";

export default function SpecialNotes() {
  return (
    <section className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-[1100]">
        <p className="font-medium text-lg sm:text-xl mb-3">Special Notes</p>

        <div className="w-full border border-gray-200 shadow-sm rounded-md p-4 sm:p-6 space-y-4">
          {/* Quick Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Input
              placeholder="Leave order in front of the door"
              className="w-full"
            />
            <Input
              placeholder="Don’t ring the bell"
              className="w-full"
            />
            <Input
              placeholder="Call 30 min in advance"
              className="w-full"
            />
          </div>

          {/* Custom Note */}
          <div>
            <Input
              placeholder="Additional notes for the courier..."
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}