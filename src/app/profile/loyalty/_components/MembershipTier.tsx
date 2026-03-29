import { Crown } from "lucide-react";

export default function MembershipTier({
  currentTier = "Gold",
  currentPoints = 2450,
  maxPoints = 10000,
  tiers,
}: {
  currentTier?: string;
  currentPoints?: number;
  maxPoints?: number;
  tiers: any[];
}) {
  const progressPercentage = (currentPoints / maxPoints) * 100;
  const pointsToGo = maxPoints - currentPoints;

  return (
    <div className="bg-[#f7fcff] border border-[#dad8d8] rounded-lg p-8 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Crown />
        <h3 className="text-[#0e1112]">Membership Tier: {currentTier}</h3>
      </div>

      {/* Progress Section */}
      <div className="flex flex-col gap-2 px-8">
        <div className="flex items-center justify-between">
          <span className="text-[#014162]">Progress to Platinum</span>
          <span className="text-[#0e1112]">
            {currentPoints.toLocaleString()} / {maxPoints.toLocaleString()} pts
          </span>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#e5e7eb] rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progressPercentage}%`,
              backgroundImage:
                "linear-gradient(90deg, rgb(247, 252, 255) 0%, rgb(154, 181, 195) 37.981%, rgb(71, 118, 143) 71.635%, rgb(1, 65, 98) 100%)",
            }}
          />
        </div>

        <p className="text-[#888] text-xs">
          {pointsToGo.toLocaleString()} points to go!
        </p>
      </div>

      {/* Tier Badges */}
      <div className="flex gap-6 px-8 py-2">
        {tiers.map((tier) => (
          <button
            key={tier.name}
            className={`rounded-lg p-6 flex flex-col gap-2 items-center w-[100px] ${
              tier.isCurrent
                ? "bg-[#014162] text-[#f7fcff]"
                : "bg-[#f7fcff] border border-[#dad8d8] text-[#014162]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{tier.name}</span>
              {tier.isCurrent && <Crown />}
            </div>
            <span
              className={`text-xs ${tier.isCurrent ? "text-[#f7fcff]" : "text-[#0e1112]"}`}
            >
              {tier.points} pts
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
