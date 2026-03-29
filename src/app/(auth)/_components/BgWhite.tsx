import Back from "@/components/common/Back";
import Container from "@/components/common/Container";

export default function BgWhite({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-white">
      <Container
        className={`fixed inset-0 flex items-center justify-center bg-white px-2 transition-opacity duration-300`}
      >
        <Back />
        <div
          className={`bg-white rounded-[39px] shadow-[7px_0px_25px_0px_rgba(0,0,0,0.10)] w-[475px] px-6 py-16 md:px-16 relative transition-all duration-300`}
        >
          <div className="flex flex-col gap-4">{children}</div>
        </div>
      </Container>
    </div>
  );
}
