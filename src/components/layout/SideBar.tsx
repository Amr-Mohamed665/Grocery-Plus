// Icons
import {
  CircleQuestionMark,
  Crown,
  LayoutDashboard,
  ListChecks,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
  User,
  Wallet,
  WalletMinimal,
} from "lucide-react";

// React
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/hooks/auth/useAuth";

import profileImage from "@/assets/avatar.jpg";

// Data
const links = [
  {
    name: "Dashboard",
    href: "/profile/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Personal Info",
    href: "/profile/personal",
    icon: <User size={20} />,
  },
  {
    name: "Payment & Wallet",
    href: "/profile/payment",
    icon: <WalletMinimal size={20} />,
  },
  {
    name: "Order History",
    href: "/profile/order-history",
    icon: <Package size={20} />,
  },
  {
    name: "Smart Lists",
    href: "/profile/smart-list",
    icon: <ListChecks size={20} />,
  },
  {
    name: "Addresses",
    href: "/profile/addresses",
    icon: <MapPin size={20} />,
  },
  {
    name: "Security & Login",
    href: "/profile/security-and-login",
    icon: <ShieldCheck size={20} />,
  },
  {
    name: "Loyalty & Rewards",
    href: "/profile/loyalty",
    icon: <Wallet size={20} />,
  },
  {
    name: "Help & Support",
    href: "/profile/help",
    icon: <CircleQuestionMark size={20} />,
  },
  {
    name: "Settings",
    href: "/profile/settings",
    icon: <Settings size={20} />,
  },
];

// export default function ProfileNavigationMenu({ userData }: { userData: any }) {
export default function ProfileNavigationMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="sticky top-5 w-full h-fit rounded-r-lg md:rounded-lg border-r md:border border-[#dad8d8] flex flex-col transition-all duration-300 z-50">
      {/* Fixed Profile Info Section */}
      <div className="border-b border-[#e5e7eb] p-2 md:p-6 h-20 md:h-35 flex items-center justify-center md:justify-start shrink-0">
        <div className="flex items-center gap-0 md:gap-4">
          {/* Profile Image */}
          <div className="relative">
            <div className="relative overflow-hidden h-16 w-16 rounded-full bg-[#f3f4f6] flex items-center justify-center border-2 border-[#f7fcff]">
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="relative -top-3 object-cover"
              />
            </div>
            {/* Loyalty Badge */}
            <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#f7fcff]">
              <Crown className="text-[gold]" size={24} />
            </div>
          </div>

          {/* Profile Info */}
          <div className="hidden md:flex flex-col gap-1">
            <h3 className="font-['Inter'] text-base font-semibold text-[#01050d]">
              User
            </h3>
            <p className="font-['Inter'] text-base text-[#014162]">
              Gold Member
            </p>
          </div>
        </div>
      </div>

      {/* Logout Button - Moved above Dashboard */}
      <div className="border-b border-[#e5e7eb] p-3 md:p-4 shrink-0">
        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="flex h-12 w-full items-center justify-center md:justify-start gap-0 md:gap-4 rounded-xl px-2 md:px-4 py-1 transition-all duration-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex h-6 w-6 items-center justify-center text-red-600">
            <LogOut size={20} />
          </div>
          <span className="hidden md:inline font-['Inter'] text-base text-red-600 font-semibold">
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>

      {/* Scrollable Navigation Menu */}
      <nav className="flex-1 flex flex-col gap-2 p-3 md:p-4 overflow-y-auto scrollbar-hide">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              title={link.name}
              className={`flex h-12 items-center justify-center md:justify-start gap-0 md:gap-4 rounded px-2 md:px-4 py-1 transition-all duration-200 ${
                isActive
                  ? "bg-linear-to-b from-[#014162] to-[rgba(1,65,98,0.9)] text-white shadow-md"
                  : "bg-[#f7fcff] text-[#0e1112] hover:bg-gray-100"
              }`}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center ${
                  isActive ? "text-white" : "text-[#014162]"
                }`}
              >
                {link.icon}
              </div>
              <span
                className={`hidden md:inline font-['Inter'] text-base ${
                  isActive ? "text-white font-medium" : "text-[#0e1112]"
                }`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
  //           <div className="relative overflow-hidden h-16 w-16 rounded-full bg-[#f3f4f6] flex items-center justify-center border-2 border-[#f7fcff]">
  //             {userData?.profile_image_url ? (
  //               <Image
  //                 src={userData?.profile_image_url}
  //                 alt="Profile"
  //                 fill
  //                 className="relative -top-3 object-cover"
  //               />
  //             ) : (
  //               <div className="h-full w-full bg-[#dad8d8] flex items-center justify-center">
  //                 <User className="size-8" />
  //               </div>
  //             )}
  //           </div>
  //           {/* Loyalty Badge */}
  //           <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#f7fcff]">
  //             <Crown className="text-[gold]" size={24} />
  //           </div>
  //         </div>

  //         {/* Profile Info */}
  //         <div className="hidden md:flex flex-col gap-1">
  //           <h3 className="font-['Inter'] text-base font-semibold text-[#01050d]">
  //             {userData?.firstname || "User"}
  //           </h3>
  //           <p className="font-['Inter'] text-base text-[#014162]">
  //             Gold Member
  //           </p>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Scrollable Navigation Menu */}
  //     <nav className="flex-1 flex flex-col gap-2 p-3 md:p-4 overflow-y-auto scrollbar-hide">
  //       {links.map((link) => {
  //         const isActive = pathname === link.href;
  //         return (
  //           <Link
  //             key={link.name}
  //             href={link.href}
  //             title={link.name}
  //             className={`flex h-12 items-center justify-center md:justify-start gap-0 md:gap-4 rounded px-2 md:px-4 py-1 transition-all duration-200 ${
  //               isActive
  //                 ? "bg-linear-to-b from-[#014162] to-[rgba(1,65,98,0.9)] text-white shadow-md"
  //                 : "bg-[#f7fcff] text-[#0e1112] hover:bg-gray-100"
  //             }`}
  //           >
  //             <div
  //               className={`flex h-6 w-6 items-center justify-center ${
  //                 isActive ? "text-white" : "text-[#014162]"
  //               }`}
  //             >
  //               {link.icon}
  //             </div>
  //             <span
  //               className={`hidden md:inline font-['Inter'] text-base ${
  //                 isActive ? "text-white font-medium" : "text-[#0e1112]"
  //               }`}
  //             >
  //               {link.name}
  //             </span>
  //           </Link>
  //         );
  //       })}
  //     </nav>
  //   </div>
  // );
}
