"use client";

import { HeroSection } from "@/app/components/sections/HeroSection";
import { FeaturedProducts } from "@/app/components/sections/FeaturedProducts";
import { FeaturesSection } from "@/app/components/sections/FeaturesSection";
import { PromoSection } from "@/app/components/sections/PromoSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <div id="products">
        <FeaturedProducts />
      </div>
      <PromoSection />
    </>
  );
}
