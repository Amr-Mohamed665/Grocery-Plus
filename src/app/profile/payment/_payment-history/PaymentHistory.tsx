import { IoIosArrowForward } from "react-icons/io";
import paymentHistoryData from "./historyData";
import { Button } from "@/components/ui/Button";

function PaymentHistory() {
  return (
    <div className="shadow space-y-6 p-6">
      <h3 className="text-lg font-semibold">Payment History</h3>
      <div className="space-y-3">
        {paymentHistoryData.map((data) => (
          <div
            key={data.id}
            className="flex justify-between border border-slate-200 p-4 rounded-xl mb-3 bg-white"
          >
            <div>
              <p className="font-semibold text-slate-800">
                {data.isRefund ? "Refund Order" : "Order"} #{data.orderNumber}
              </p>
              <p className="text-sm text-slate-500">{data.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">
                {data.isRefund ? "+" : ""} {data.currencySymbol}
                {data.amount}
              </p>
              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-medium">
                {data.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button className="cursor-pointer rounded-xl font-normal mt-4 bg-[#014162]">
        View All Transactions <IoIosArrowForward />
      </Button>
    </div>
  );
}

export default PaymentHistory;
