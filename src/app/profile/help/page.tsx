import FAQ from "./_components/FAQ";
import ReportIssue from "./_components/reports";
import SupportWidget from "./_components/supports";
import Head from "@/components/common/Head";

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-5">
      <Head
        title="Help & Support"
        description="We are here to help with any question an issues!"
      />
      <SupportWidget />
      <FAQ />
      <ReportIssue />
    </div>
  );
}
