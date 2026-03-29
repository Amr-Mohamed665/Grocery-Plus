"use client";

// Components
import Container from "@/components/common/Container";
import Navbar from "@/components/layout/SideBar";

// Custom Hooks
// import { useProfile } from "@/hooks/profile/useProfile";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const { data } = useProfile();

  return (
    <Container className="pt-5">
      <div className="flex gap-2 md:gap-6 justify-between h-auto">
        <div className="left-content w-17.5 md:w-66.75 transition-all duration-300 shrink-0 relative pb-13">
          {/* <Navbar userData={data} /> */}
          <Navbar />
        </div>
        <div className="right-content flex-1 pb-13">
          {children}
        </div>
      </div>
    </Container>
  );
}
