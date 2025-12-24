import { HeroSection } from "@/components/pages/home/HeroSection";
import Footer from "@/components/ui/Footer";
import { AboutSection } from "@/components/pages/home/AboutSection";
import { BenefitsSection } from "@/components/pages/home/BenefitsSection";
import { ContactSection } from "@/components/pages/home/ContactSection";
import { HowItWorksStepsSection } from "@/components/pages/home/HowItWorksStepsSection";
import { FaqSection } from "@/components/pages/home/FaqSection";
import { Header } from "@/components/ui/Header";

export default function Home() {
  return (
    <main className="max-w-[1920px] min-w-[320px] mx-auto">
      <div className="sticky bg-white top-0 left-0 z-10">
      <Header />
      </div> 
      <div>
        <HeroSection />
        <div className="py-8 px-[5%] pb-16 flex flex-row gap-16 justify-center items-stretch my-16 w-full mobile:flex-col mobile:gap-8 mobile:my-8 mobile:py-6 mobile:pb-8 [&>*]:flex-1 [&>*]:min-w-0">
          <AboutSection id="about-section" />
          <BenefitsSection />
        </div>

        <HowItWorksStepsSection />
        <FaqSection id="faq-section" />
        <ContactSection id="contact-section" />
        <Footer />
      </div>
    </main>
  );
}
