import { PoundSterling } from "lucide-react";

export default function LoyaltyPoints({
  points = 2450,
  rewardValue = 24.5,
  onRedeem,
}: {
  points?: number;
  rewardValue?: number;
  onRedeem?: () => void;
}) {
  return (
    <div className="bg-[#014162] rounded-lg p-8 flex flex-col gap-2 shadow-[-1px_0px_4px_0px_rgba(1,65,98,0.25)]">
      <p className="text-[#f7fcff] text-xs px-4">Your Points Balance</p>

      <div className="flex items-center justify-between px-4">
        <div className="flex flex-col">
          <p className="text-[#f7fcff] text-2xl font-semibold">
            {points.toLocaleString()}
          </p>
          <p className="text-[#f7fcff] text-xs">
            = £ {rewardValue.toFixed(2)} in rewards
          </p>
        </div>

        <div className="bg-[#f7fcff] rounded-full size-11 flex items-center justify-center">
          <PoundSterling />
        </div>
      </div>

      <button
        onClick={onRedeem}
        className="bg-[#f7fcff] border border-[#014162] text-[#014162] px-4 py-2 rounded-lg w-[150px] mx-4"
      >
        Redeem Points
      </button>
    </div>
  );
}