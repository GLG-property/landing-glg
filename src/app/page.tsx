import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { TopBanner } from "@/components/TopBanner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CarsVideo } from "@/components/CarsVideo";
import { Benefits } from "@/components/Benefits";
import { Stats } from "@/components/Stats";
import { WhyUs } from "@/components/WhyUs";
import { Voucher } from "@/components/Voucher";
import { Pricing } from "@/components/Pricing";
import { Steps } from "@/components/Steps";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { CityGuide } from "@/components/CityGuide";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { CookieConsent } from "@/components/CookieConsent";
import { FaqJsonLd } from "@/components/JsonLd";
import { homeDescription, homeTitle, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: homeTitle,
  absoluteTitle: true,
  description: homeDescription,
  path: "/",
});

export default function Home() {
  return (
    <LanguageProvider>
      <FaqJsonLd />
      <TopBanner />
      <Navbar />
      <main>
        <Hero />
        {/* Videoclipul cu mașinile imediat sub hero, în prim-plan (cerința patronului, 22.10.2026). */}
        <CarsVideo />
        <Benefits />
        <Stats />
        <WhyUs />
        <Voucher />
        <Pricing />
        <Steps />
        <Testimonials />
        <Faq />
        <Team />
        <Contact />
        <CityGuide />
      </main>
      <Footer />
      <FloatingContact />
      <CookieConsent />
    </LanguageProvider>
  );
}
