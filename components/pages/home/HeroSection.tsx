"use client";
import Image from "next/image";
import DottedBox from "@/public/images/dotted_box.svg";
import Advert from "@/components/ui/Advert";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef, memo } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const CAROUSEL_IMAGES = [
  "/images/Hero/4.svg",
  "/images/Hero/5.svg",
  "/images/Hero/6.svg",
  "/images/Hero/7.svg",
  "/images/Hero/8.svg",
  "/images/Hero/1.svg",
  "/images/Hero/2.svg",
  "/images/Hero/3.svg",
] as const;

const CAROUSEL_INTERVAL = 5000;
const TRANSITION_DURATION = 1.8;

const imageVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const transition = { opacity: { duration: TRANSITION_DURATION, ease: "easeInOut" } } as const;

const useCarousel = (imageCount: number, interval: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrentIndex((prev) => (prev + 1) % imageCount);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [imageCount, interval]);

  const pause = useCallback(() => { isPausedRef.current = true; }, []);
  const resume = useCallback(() => { isPausedRef.current = false; }, []);

  return { currentIndex, pause, resume };
};

const HeroCarousel = memo(function HeroCarousel() {
  const { currentIndex, pause, resume } = useCarousel(CAROUSEL_IMAGES.length, CAROUSEL_INTERVAL);
  const nextIndex = (currentIndex + 1) % CAROUSEL_IMAGES.length;

  return (
    <div
      className="relative w-[650px] max-w-[650px] min-w-[650px] h-[455px] rounded-[10px] overflow-hidden z-[2] mobile:w-full mobile:max-w-full mobile:min-w-0 mobile:h-[250px]"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <link rel="preload" as="image" href={CAROUSEL_IMAGES[nextIndex]} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center [transform:rotateX(15deg)]"
        >
          <div className="relative w-full h-full rounded-[10px] overflow-hidden">
            <Image
              src={CAROUSEL_IMAGES[currentIndex]}
              alt={`Hero image ${currentIndex + 1}`}
              fill
              className="w-full h-full object-cover rounded-[10px]"
              priority={currentIndex === 0}
              loading={currentIndex === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  }, []);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPromotionalEmails(e.target.checked);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    const params = new URLSearchParams({ email: trimmedEmail });
    if (promotionalEmails) params.set("promotional_emails", "true");
    router.push(`/signup?${params.toString()}`);
  }, [email, promotionalEmails, router]);

  return (
    <header className="px-[5%] py-4 pb-0 bg-white relative overflow-hidden mobile:px-[5%] mobile:py-1.5 mobile:pb-4 mobile:min-h-auto ">
      <Advert />
      <div className="flex items-center justify-between gap-8 relative max-w-container mx-auto p-8 mobile:flex-col mobile:text-center mobile:gap-6 mobile:mt-4 mobile:p-4 mobile:pt-8">
        <div className="flex-[0_0_45%] max-w-[500px] relative mobile:flex-none mobile:w-full mobile:mx-auto mobile:max-w-full">
          <DottedBox className="absolute top-0 -left-[150px] z-0 w-[100px] h-auto pointer-events-none mobile:w-[70px] mobile:-top-10 mobile:left-0" />
          <h1 className="heading-1 mb-6 mobile:mb-4">
            Reconnecting retirees and veterans through purposeful work
          </h1>
          <p className="font-open-sans text-subtitle text-text-muted mb-2 max-w-[80%] text-base mobile:text-sm mobile:mb-2 mobile:max-w-full">
            From careers to causes, we connect you to purposeful opportunities quickly, easily, and on your terms
          </p>

          <div className="mobile:w-full mobile:max-w-[520px] mobile:mx-auto mobile:gap-4">
            <form className="flex flex-col gap-2 w-full mt-2 items-start" onSubmit={handleSubmit}>
              <label htmlFor="newsletter-email" className="font-open-sans font-semibold text-text-muted mb-0.5 text-sm">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                className={clsx(
                  "w-full py-4 px-5 border-2 border-gray-200 rounded-2xl font-open-sans text-base outline-none mb-0.5 transition-colors bg-white box-border focus:border-primary",
                  emailError && "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(220,53,69,0.1)]"
                )}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <span className="text-red-500 text-sm mt-1 block">{emailError}</span>}
              <div className="flex items-start gap-2 mt-2 mb-3">
                <input
                  id="newsletter-checkbox"
                  type="checkbox"
                  className="cursor-pointer w-5 h-5 rounded border-2 border-primary accent-primary shrink-0 mt-0.5"
                  checked={promotionalEmails}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="newsletter-checkbox" className="font-open-sans text-text-muted cursor-pointer leading-snug text-left text-sm">
                  I would like to receive promotional emails from VetriConn Inc
                </label>
              </div>
              <button type="submit" className="bg-primary text-white font-open-sans font-semibold border-none rounded-[18px] py-4 px-0 cursor-pointer transition-colors w-full shadow-none hover:bg-primary-hover mobile:w-full mobile:py-3.5 mobile:px-4">
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div className="relative flex-[0_0_auto] flex w-[650px] max-w-[650px] justify-center items-center h-[455px] mobile:flex-none mobile:w-full mobile:max-w-full mobile:h-[250px] before:content-[''] before:absolute before:w-full before:max-w-[650px] before:h-[455px] before:top-5 before:-right-5 before:rounded-[10px] before:bg-primary before:bg-[url('/favicon-white.svg')] before:bg-no-repeat before:bg-center before:bg-[length:200px_200px] before:opacity-100 before:z-[1] before:[transform:rotateX(15deg)] mobile:before:hidden">
          <DottedBox className="absolute -bottom-[30px] -right-[70px] z-[3] w-[100px] h-auto pointer-events-none" />
          <HeroCarousel />
        </div>
      </div>
    </header>
  );
};
