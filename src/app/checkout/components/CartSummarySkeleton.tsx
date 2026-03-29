import { Skeleton } from "@/components/ui/skeleton";

export default function CartSummarySkeleton() {
  return (
    <div className="w-full lg:w-[500px]">
      <Skeleton className="h-6 w-40 mb-3" />

      <div className="w-full border border-gray-200 pl-4 lg:pl-6 shadow-sm rounded-md">
        {/* Products */}
        <div className="max-h-[400px] lg:max-h-[565px] px-2 overflow-y-auto space-y-6 py-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full border-b border-gray-300 flex gap-4 lg:gap-6 py-4 lg:py-6"
            >
              {/* Image */}
              <Skeleton className="w-[70px] h-[70px] rounded-md" />

              {/* Details */}
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-[60%]" />

                <div className="flex justify-between items-center">
                  {/* Quantity */}
                  <Skeleton className="h-8 w-[110px] rounded-xl" />

                  {/* Price */}
                  <Skeleton className="h-5 w-[60]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Section */}
        <div className="py-4 pr-4 lg:pr-7 space-y-3">
          <Skeleton className="h-6 w-40" />

          <div className="space-y-2 border-b border-gray-200 pb-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <div className="flex justify-between pt-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
