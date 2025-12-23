import styles from "./page.module.css";
import { HeroSection } from "@/components/pages/home/HeroSection";
import Footer from "@/components/ui/Footer";
import { AboutSection } from "@/components/pages/home/AboutSection";
import { BenefitsSection } from "@/components/pages/home/BenefitsSection";
import { ContactSection } from "@/components/pages/home/ContactSection";
import { HowItWorksStepsSection } from "@/components/pages/home/HowItWorksStepsSection";
import { FaqSection } from "@/components/pages/home/FaqSection";

export default function Home() {
  return (
    <main className={styles.Container}>
      <HeroSection />
      <div className={styles.infoSections}>
        <AboutSection id="about-section" />
        <BenefitsSection />
      </div>

      <HowItWorksStepsSection />
      <FaqSection id="faq-section" />
      <ContactSection id="contact-section" />
      <Footer />
    </main>
  );
}
