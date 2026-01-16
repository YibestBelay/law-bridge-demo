"use client";

import Layout from "@/components/shared/Layout";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import HowItWorks from "@/components/HowItWorks";
import FeaturedLawyers from "@/components/FeaturedLawyers";
import Statistics from "@/components/Statistics";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-white pb-16 md:pb-0">
        <Hero />
        <ValueProposition />
        <HowItWorks />
        <FeaturedLawyers />
        <Statistics />
        <WhyChooseUs />
        <Testimonials />
        <CTABanner />
        <Footer />
        <MobileNav />
      </div>
    </Layout>
  );
}
