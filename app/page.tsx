import { HeroSection } from "@/components/pages/home/HeroSection";
import styles from "./page.module.css";
import JobNoticeboard from "@/components/pages/home/jobNoticeboard";
import Footer from "@/components/ui/Footer";
import TestimonialsSection from "@/components/pages/home/TestimonialsSection";
import { AboutSection } from "@/components/pages/home/AboutSection";
import { HowItWorksSection } from "@/components/pages/home/HowItWorksSection";
import  ContactSection  from "@/components/pages/home/ContactSection";
import HowItWorksStepsSection from "@/components/pages/home/HowItWorksStepsSection";
export default function Home() {
  return (
    <main className={styles.Container}>
      <HeroSection />
      <div className={styles.infoSections}>
        <AboutSection />
        <HowItWorksSection />
      </div>
      <JobNoticeboard />
      <TestimonialsSection />
      <HowItWorksStepsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
