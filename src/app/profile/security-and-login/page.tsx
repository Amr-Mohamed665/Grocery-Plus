import ChangePass from "./_components/ChangePass";
import DelAccount from "./_components/DelAccount";
import SecurityNotice from "./_components/SecurityNotice";
import TwoFactorAuthentication from "./_components/TwoAuth";
import Head from "@/components/common/Head";

export default function SecurityAndLogin() {


  return (
    <div className="flex flex-col gap-5">
      <Head
        title="Security & Login"
        description="Manage your account security and login settings."
      />
      <SecurityNotice />
      <ChangePass />
      <TwoFactorAuthentication />
      <DelAccount />
    </div>
  );
}
