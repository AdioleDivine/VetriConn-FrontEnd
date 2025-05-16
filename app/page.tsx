
import { HeroSection } from "@/components/pages/home/HeroSection";
import styles from "./page.module.css";
import JobNoticeboard from "@/components/pages/home/jobNoticeboard";
import Footer from "@/components/ui/Footer";
import TestimonialsSection from "@/components/pages/home/TestimonialsSection";
export default function Home() {
  return (
    
    <main className={styles.Container}>
      <HeroSection/>
      <JobNoticeboard />
      <TestimonialsSection />
      <Footer />
      </main>

  );
}
