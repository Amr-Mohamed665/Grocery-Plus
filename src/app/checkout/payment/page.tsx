import PageTitel from "../components/PageTitel";
import ProgressBar from "./components/ProgressBar";
import PaymentMethod from "./components/PaymentMethod";
import OrderSummary from "./components/OrderSummary";
import Cta from "../components/Cta";
export default function Home() {
  return (
    <>
      <PageTitel
        track="Home/ Fresh Products/ Cart/ Shipping/"
        current_page="Checkout (Payment)"
      />
      <ProgressBar />
      <PaymentMethod />
      <OrderSummary />
      <Cta text="Confirm Payment & Go To Checkout " link="/tracking" />
    </>
  );
}
