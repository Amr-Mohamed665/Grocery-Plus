import Image from "next/image";

import banner1 from "@/assets/banner1.png";
import banner2 from "@/assets/banner2.png";
import Container from "../common/Container";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function DealBanner() {
  const arrowPath =
    "M2.452 6.58L3.513 5.52L9.292 11.297C9.38515 11.3896 9.45908 11.4996 9.50953 11.6209C9.55998 11.7421 9.58595 11.8722 9.58595 12.0035C9.58595 12.1348 9.55998 12.2649 9.50953 12.3861C9.45908 12.5074 9.38515 12.6174 9.292 12.71L3.513 18.49L2.453 17.43L7.877 12.005L2.452 6.58Z";

  return (
    <Container className="flex gap-6 items-center justify-center my-4 md:my-9 lg:my-16 relative flex-wrap">
      {/* Free Delivery Banner */}
      <div className="bg-[#bcb8b1] w-full lg:flex-1 h-[250px] md:h-[300px] overflow-clip relative rounded-[8px]">
        <div className="-translate-y-1/2 absolute flex flex-col gap-[43px] items-start left-[32px] top-1/2 z-40">
          <div className="flex flex-col h-[137px] items-start justify-between relative shrink-0">
            <div className="bg-[#014162] flex h-[26px] items-center justify-center p-[7px] relative rounded-[8px] shrink-0">
              <p className="font-medium relative text-[12px] text-white tracking-[-0.12px]">
                Free delivery
              </p>
            </div>
            <div className="flex flex-col gap-[15px] items-start relative shrink-0">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative text-[#253d4e] text-xl md:text-[28px]">
                Free delivery over £50
              </p>
              <p className="font-medium relative text-[#014162] text-sm md:text-[18px] tracking-[-0.18px] w-full max-w-[255px] whitespace-pre-wrap">
                Shop £50 product and get free delivery anywhre.
              </p>
            </div>
          </div>
          <Link href="/shop">
            <div className="bg-[#014162] flex gap-[4px] h-[52px] items-center justify-center p-[8px] relative rounded-[8px] w-[143px]">
              <p className="font-normal relative text-[#f7fcff] text-[16px]">
                Shop Now
              </p>
              <div className="flex flex-col items-center justify-center relative rounded-[8px] shrink-0">
                <div className="h-[24px] relative w-[12px]">
                  <ChevronRight color="#f7fcff" />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="absolute h-[300px] left-full -translate-x-full top-0 w-[184px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Image
              alt="Delivery person with groceries"
              className="absolute h-[106.53%] left-[-68.85%] max-w-none top-[-6.53%] w-[250.82%]"
              src={banner1}
            />
          </div>
        </div>
      </div>

      {/* Organic Food Banner */}
      <div className="bg-[#014162] w-full lg:flex-1 h-[250px] md:h-[300px] overflow-clip relative rounded-[8px]">
        <div className="-translate-y-1/2 absolute flex flex-col gap-[43px] items-start left-[32px] top-1/2 z-40">
          <div className="flex flex-col gap-[15px] items-start relative shrink-0">
            <div className="bg-[#bcb8b1] flex h-[26px] items-center justify-center p-[7px] relative rounded-[8px] w-[87px]">
              <p className="font-medium relative text-[#014162] text-[12px] tracking-[-0.12px]">
                60% off
              </p>
            </div>
            <div className="flex flex-col gap-[15px] items-start relative text-[#f7fcff]">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative text-xl md:text-[28px]">
                Organic Food
              </p>
              <p className="font-medium relative text-sm md:text-[18px] tracking-[-0.18px] w-full max-w-[255px] whitespace-pre-wrap">
                Save up to 60% off on your first order
              </p>
            </div>
          </div>
          <Link href="/shop">
            <div className="bg-[#bcb8b1] flex gap-[4px] h-[52px] items-center justify-center p-[8px] relative rounded-[8px] w-[143px]">
              <p className="font-normal relative text-[#014162] text-[16px]">
                Shop Now
              </p>
              <div className="flex flex-col items-center justify-center relative rounded-[8px] shrink-0">
                <div className="h-[24px] relative w-[12px]">
                  <ChevronRight color="#014162" />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="absolute h-[258px] left-full -translate-x-full top-[42px] w-[275px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Image
              alt="Fresh organic fruits"
              className="absolute h-[100.81%] left-[-67.76%] max-w-none top-[-0.81%] w-[167.76%]"
              src={banner2}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
