import { HelpCircle } from "lucide-react";

function FAQSection() {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 font-semibold">
        <HelpCircle className="h-4 w-4 text-[#0A4868]" />
        Frequently Asked Questions
      </div>

      <div className="mt-3 space-y-2">
        {[
          {
            q: "How do I track my orders?",
            a: "Go to Order History and select any order to see real-time tracking.",
          },
          {
            q: "What is your return policy?",
            a: "We accept returns within 7 days for non-perishable items in original packaging.",
          },
          {
            q: "How do I cancel my subscription?",
            a: "Visit the Subscriptions page and click Cancel on any active subscription.",
          },
          {
            q: "Do you deliver on weekends?",
            a: "Yes! We deliver 7 days a week including holidays.",
          },
        ].map((item, i) => (
          <div key={i} className="rounded-md bg-gray-100 p-3 text-sm">
            <p className="font-medium text-gray-800">{item.q}</p>
            <p className="mt-1 text-gray-600">{item.a}</p>
          </div>
        ))}
      </div>

      <button className="mt-3 rounded-md bg-[#0A4868] px-4 py-2 text-sm text-white">
        View All FAQs
      </button>
    </div>
  );
}

export default FAQSection;
