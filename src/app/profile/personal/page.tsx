"use client";

// Components
import Basic from "./_components/Basic";
import Notifications from "./_components/Notifications";
import Avatar from "./_components/Avatar";

// Custom Hooks
// import { useProfile } from "@/hooks/profile/useProfile";

export default function Personal() {
  // const { data, isLoading } = useProfile();

  return (
    <div className="personal-dashboard">
      <div className="content flex flex-col gap-14">
        {/* Head */}
        <div className="head flex flex-col justify-between gap-4">
          <h2 className="font-medium text-[20px]">Personal Information</h2>
          <p className="font-normal text-[18px]">
            Manage your personal details and preferences
          </p>
        </div>

        {/* Avatar */}
        <Avatar />
        {/* <Avatar dataUser={data} isLoading={isLoading} /> */}

        {/* Basic Info & Language */}
        <Basic />
        {/* <Basic dataUser={data} /> */}

        {/* Notification preference */}
        <Notifications />
      </div>
    </div>
  );
}
