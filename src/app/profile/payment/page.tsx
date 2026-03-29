// import Card from "@/components/common/Card";
// import PoundSympol from "@/components/ui/PoundSympol";
import PaymentSelector from "./_payment-selector/PaymentSelector";
import PaymentHistory from "./_payment-history/PaymentHistory";
import PaymentInvoice from "./_payment-invoice/PaymentInvoice";
import Head from "@/components/common/Head";

const fakeDATA = {
  storeCredit: 12.5,
  currency: "£",
  expiryDate: "Dec 31, 2025",
};

function PaymentPage() {
  return (
    <div className="w-full flex flex-col gap-8 space-y-8">
      {/* Header Section */}
      <Head
        title="Payment & Wallet"
        description="Manage your payment methods and view transaction history"
      />

      {/* Wallet Card - The p-8 should now be very visible */}
      <div
        className="bg-[#014162] text-white rounded-2xl shadow-lg w-full"
        style={{ padding: "32px" }}
      >
        <h2 className="text-lg font-medium opacity-90">Store Credit</h2>
        <div className="flex items-center justify-between my-2">
          <p className="text-3xl font-bold">
            {fakeDATA.currency}
            {fakeDATA.storeCredit}
          </p>
          <div className="flex ">
            <div className=" pt-1 bg-white text-center font-bold text-[#014162] text-2xl w-11 h-11 rounded-full">
              £
            </div>
          </div>
        </div>
        <p className="text-sm font-light opacity-80 mt-4">
          Available for your next purchase • Expires: {fakeDATA.expiryDate}
        </p>
      </div>

      {/* Components List */}
      <div className="flex flex-col gap-6">
        <PaymentSelector />
        <PaymentHistory />
        <PaymentInvoice />
      </div>
    </div>
  );
}

export default PaymentPage;
