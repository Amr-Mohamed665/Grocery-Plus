import PageTitel from "../components/PageTitel";
import ProgressBar from "./components/ProgressBar";
import Info from "./components/Info";
import SpecialNotes from "./components/SpecialNotes";
import Cta from "../components/Cta";
import Container from "@/components/common/Container";

export default function Home() {
  return (
    <>
      <Container>
        <PageTitel
          track="Home/ Fresh Products/ Cart/"
          current_page="Checkout (shipping)"
        />
      </Container>
      <ProgressBar />
      <Info />
      <SpecialNotes />
      <Cta text="Continue Checkout" link="/payment" />
    </>
  );
}
