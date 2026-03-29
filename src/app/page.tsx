"use client";

import Hero from "@/components/home/Hero";
import HotDeal from "@/components/home/HotDeal";
import NewProduct from "@/components/home/NewProduct";
import DealBanner from "@/components/home/DealBannar";
import BestSells from "@/components/home/BestSells";
import Feature from "@/components/home/Feature";

export default function Home() {
  
  return (
    <main>
      <Hero />
      <HotDeal />
      <NewProduct />
      <DealBanner />
      <BestSells />
      <Feature />
    </main>
  );
}
