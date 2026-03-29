import Coupons from "./_components/Coupons";
import MembershipTier from "./_components/MembershipTier";
import PlanBenefits from "./_components/PlanBenefits";
import ReferAFriend from "./_components/ReferAFriend";
import LoyaltyPoints from "./_components/LoyaltyPoints";
import Head from "@/components/common/Head";

const membershipTiers = [
  { name: "Bronze", points: 1000, isCurrent: false },
  { name: "Silver", points: 2500, isCurrent: false },
  { name: "Gold", points: 5000, isCurrent: true },
  { name: "Platinum", points: 10000, isCurrent: false },
];

const benefitsData = [
  {
    id: "1",
    icon: "star" as const,
    title: "2x Points",
    description: "Earn double points on all purchases",
  },
  {
    id: "2",
    icon: "gift" as const,
    title: "Birthday Bonus",
    description: "500 bonus points on your birthday",
  },
  {
    id: "3",
    icon: "deal" as const,
    title: "Exclusive Deals",
    description: "Access to member-only promotions",
  },
  {
    id: "4",
    icon: "clock" as const,
    title: "Priority Support",
    description: "Faster customer service response",
  },
];

const couponsData = [
  {
    id: "1",
    title: "15% off",
    code: "SAVE15",
    details: "Min. order $50 • Expires: Dec 31, 2025",
  },
  {
    id: "2",
    title: "Free Delivery",
    code: "FREESHIP",
    details: "Expires: Dec 15, 2025",
  },
  {
    id: "3",
    title: "£10 off Organic",
    code: "ORGANIC10",
    details: "Min. order $30 • Expires: Jan 15, 2026",
  },
];

export default function LoyaltyPage() {
  return (
    <div className="flex flex-col gap-5">
      <Head
        title="Loyalty & Rewards"
        description="Track your points, rewards, and membership benefits."
      />
      <LoyaltyPoints />
      <MembershipTier tiers={membershipTiers} />
      <PlanBenefits benefits={benefitsData} />
      <Coupons coupons={couponsData} />
      <ReferAFriend />
    </div>
  );
}
