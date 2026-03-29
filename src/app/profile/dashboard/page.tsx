"use client";
// components
import Brief from "./_components/Brief";
import CardDeliver from "./_components/CardDeliver";
import Insights from "./_components/Insights";
import History from "./_components/History";
import Loading from "@/components/common/Loading";

// React
import { useDashboard } from "@/hooks/useDashboard";
// import { useProfile } from "@/hooks/profile/useProfile";

export default function Dashboard() {
  // const { data: userData, isLoading: userLoading } = useProfile();
  const { data: dashboardData, isLoading: dashboardLoading } = useDashboard();

  return (
    <div className="profile-dashboard relative">
      {dashboardLoading ? (
        <Loading />
      ) : (
        <div className="content flex flex-col gap-14">
          {/* Brief */}
          <Brief dashboardData={dashboardData} />
          {/* <Brief dashboardData={dashboardData} userData={userData} /> */}

          {/* cart & deliver */}
          <CardDeliver dashboardData={dashboardData} />

          {/* Insights Cards & Most Bought Chart */}
          <Insights dashboardData={dashboardData} />

          {/* Order History & Top Purchases */}
          <History dashboardData={dashboardData} />
        </div>
      )}
    </div>
  );
}
