// import Loading from "@/components/common/Loading";
// import { Spinner } from "@/components/ui/spinner";

// Icons
import { Package, PoundSterling, Star } from "lucide-react";

export default function Brief({
  dashboardData,
  // userData,
}: any) {
  return (
    <div className="Brief p-8 bg-[#014162] rounded-xl border-[0.8px] border-[#014162] flex flex-col gap-2 ">
      <h2 className="font-medium text-[#F7FCFF] text-[20px] leading-7.5 tracking-[0px]">
        Welcome back !
        {/* Welcome back, {userData?.firstname || "User"}! */}
      </h2>
      <p className="font-normal text-[#F7FCFF] text-[16px] leading-[19.2px] tracking-[0px]">
        Here&apos;s what&apos;s happening with your grocery shopping
      </p>

      {/* cards */}
      <div className="cards flex-wrap flex gap-6 justify-start">
        <div className="card bg-[#F7FCFF] flex-1 p-4 rounded-[10px] min-w-[190.8px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_4px_12px_rgba(1,65,98,0.2)] cursor-pointer">
          <Package className="text-[#014162]" />
          <p className="text-[#014162] font-normal text-[16px] ">
            Track Orders
          </p>
          <p className="text-[#014162] font-normal text-[16px]">
            {dashboardData?.overview?.tracking_order || 0}{" "}
            Active
          </p>
        </div>

        <div className="card bg-[#F7FCFF] flex-1 p-4 rounded-[10px] min-w-[190.8px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_4px_12px_rgba(1,65,98,0.2)] cursor-pointer">
          <Star className="text-[#014162]" />
          <p className="text-[#014162] font-normal text-[16px] ">
            Loyalty Points
          </p>
          <p className="text-[#014162] font-normal text-[16px]">
            {dashboardData?.overview?.loyalty_points || 0}{" "}
            pts
          </p>
        </div>

        <div className="card bg-[#F7FCFF] flex-1 p-4 rounded-[10px] min-w-[190.8px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_4px_12px_rgba(1,65,98,0.2)] cursor-pointer">
          <PoundSterling className="text-[#014162]" />
          <p className="text-[#014162] font-normal text-[16px] ">
            Store Credit
          </p>
          <p className="text-[#014162] font-normal text-[16px]">
            £{" "}
            {dashboardData?.overview?.store_credits || 0}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
