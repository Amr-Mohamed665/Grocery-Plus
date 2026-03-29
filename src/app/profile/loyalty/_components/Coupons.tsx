import { Receipt } from "lucide-react";

export default function Coupons({
  coupons,
}: {
  coupons: any[];
}) {
  return (
    <div className="bg-[#f7fcff] border border-[#dad8d8] rounded-lg p-8 flex flex-col gap-4">
      <h3 className="text-[#0e1112]">Your Coupons</h3>
      <div className="flex flex-col gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-[#dad8d8] rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex gap-4 items-center">
              {/* Icon */}
              <div className="bg-[#f7fcff] rounded-lg p-4"><Receipt /></div>

              {/* Details */}
              <div className="flex flex-col gap-1">
                <h4 className="text-[#0e1112]">{coupon.title}</h4>
                <p className="text-[#0e1112]">
                  Code: <span className="text-[#014162]">{coupon.code}</span>
                </p>
                <p className="text-[#888] text-xs">{coupon.details}</p>
              </div>
            </div>

            <button
              className="bg-[#014162] text-[#f7fcff] px-4 py-2 rounded-lg"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}