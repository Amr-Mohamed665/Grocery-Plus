import { ShieldCheck } from "lucide-react";

export default function SecurityNotice() {
  return (
    <div className="border border-[#dad8d8] bg-[#D9D9D9] rounded-lg p-6">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="text-[#014162]" />
        <span className="text-[#014162]">Your Account Is Secure</span>
      </div>
      <p className="text-[#014162] pl-8">All security features are enabled</p>
    </div>
  );
}
