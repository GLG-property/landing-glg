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
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Stats />
        <CarsVideo />
        <WhyUs />
        <Voucher />
        <Pricing />
        <Steps />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
