import Image from "next/image";
import heroBg from "@/assets/heroBg.png";
import heroImg from "@/assets/authBg.png";
import Container from "../common/Container";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full lg:h-[71vh] md:h-[50vh] pb-10">
      <Image
        src={heroImg}
        alt="hero"
        className="object-cover opacity-40"
        fill
        loading="eager"
      />
      <div className="absolute inset-0 bg-[#014162F2]"></div>

      <div className="relative flex md:flex-row flex-col-reverse h-full items-start justify-between text-white">
        <Container className="w-full h-full z-20">
          <div className="h-full max-w-[1000px] flex flex-col items-start justify-center">
            <h1 className="md:text-3xl lg:text-6xl text-2xl md:w-9/12 w-full font-bold mb-4">
              Don’t miss our daily amazing deals.
            </h1>
            <p className="text-lg mb-6">
              Save up to 60% off on your first order
            </p>
            <Link href="/shop" className="rounded-lg bg-[#D9D9D9] px-15 py-3 text-black cursor-pointer">
              Shop Now
            </Link>
          </div>
        </Container>
        <Image
          className="absolute bottom-0 right-0 w-auto h-full self-end"
          src={heroBg}
          alt="hero"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
