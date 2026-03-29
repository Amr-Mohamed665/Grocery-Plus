import { Button } from "@/components/ui/Button";

import React from "react";

import { IoIosArrowForward } from "react-icons/io";

function PaymentInvoice() {
  return (
    <div className="shadow p-6 ">
      <h3 className="text-lg font-semibold mb-4">Receipt & Invoice</h3>
      <div className="space-y-3">
        <p className="text-[#4A5565]">Download PDF receipts for your orders</p>
        <Button className="cursor-pointer rounded-xl font-normal mt-4 bg-[#014162]">
          Download All Receipts <IoIosArrowForward />
        </Button>
      </div>
    </div>
  );
}

export default PaymentInvoice;
