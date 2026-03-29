import { Star, Gift, Receipt, ClockFading } from "lucide-react";

export default function PlanBenefits({ benefits }: { benefits: any[] }) {
    const renderIcon = (icon: string) => {
      switch (icon) {
        case "star":
          return (
            <Star />
          );
        case "gift":
          return (
            <Gift />
          );
        case "deal":
          return (
            <Receipt />
          );
        case "clock":
          return (
            <ClockFading />
          );
        default:
          return null;
      }
    };

  return (
    <div className="bg-[#f7fcff] border border-[#dad8d8] rounded-lg p-8 flex flex-col gap-4">
      <h3 className="text-[#0e1112]">Your Gold Benefits</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="bg-[#dad8d8] rounded-lg p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              {renderIcon(benefit.icon)}
              <h4 className="text-[#014162]">{benefit.title}</h4>
            </div>
            <p className="text-[#0e1112] text-xs pl-8">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}