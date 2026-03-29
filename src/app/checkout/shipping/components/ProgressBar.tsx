export default function ProgressBar() {
  return (
    <div className="w-full py-6 sm:py-8 flex justify-center mt-5 sm:mt-7 px-4">
      <div className="flex items-center justify-between w-full max-w-[700px]">
        {/* ===== Step 1 ===== */}
        <div className="flex flex-col items-center relative">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#014162] text-white text-sm sm:text-lg font-medium">
            1
          </div>
          <p className="pt-2 text-xs sm:text-sm font-medium text-[#014162]">
            Shipping
          </p>
        </div>

        {/* ===== Line ===== */}
        <div className="flex-1 h-[1px] bg-[#BCB8B1] mx-2 sm:mx-4" />

        {/* ===== Step 2 ===== */}
        <div className="flex flex-col items-center relative">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#BCB8B1] text-white text-sm sm:text-lg font-medium">
            2
          </div>
          <p className="pt-2 text-xs sm:text-sm font-medium text-[#BCB8B1]">
            Payment
          </p>
        </div>

        {/* ===== Line ===== */}
        <div className="flex-1 h-[1px] bg-[#BCB8B1] mx-2 sm:mx-4" />

        {/* ===== Step 3 ===== */}
        <div className="flex flex-col items-center relative">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#BCB8B1] text-white text-sm sm:text-lg font-medium">
            3
          </div>
          <p className="pt-2 text-xs sm:text-sm font-medium text-[#BCB8B1]">
            Review
          </p>
        </div>
      </div>
    </div>
  );
}
