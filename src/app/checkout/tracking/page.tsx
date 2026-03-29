import PageTitel from "../components/PageTitel";
import ProgressBar from "./components/ProgressBar";
import TrackOrder from "./components/TrackOrder";
import DriverInfo from "./components/DriverInfo";

import OrderSummary from "./components/OrderSummary";
export default function Home() {
  return (
    <>
      <PageTitel
        track="Home/ Fresh Products/ Shipping/ Payment/"
        current_page="Track Order"
      />
      <ProgressBar />
      <TrackOrder />
      <DriverInfo />
      <OrderSummary />
    </>
  );
}
