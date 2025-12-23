"use client";
import { useState, useEffect } from "react";
import Logo from "@/public/images/logo_1.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinkClass = (isActive: boolean) =>
    clsx(
      "font-open-sans text-[17px] text-text transition-colors relative pb-1.5 cursor-pointer",
      "before:content-[''] before:block before:absolute before:left-0 before:bottom-0 before:w-1 before:h-1 before:rounded-full before:bg-primary before:opacity-0 before:transition-opacity",
      "after:content-[''] after:block after:absolute after:left-2 after:bottom-px after:w-[85%] after:h-px after:bg-primary after:rounded-sm after:opacity-0 after:transition-opacity",
      "hover:text-primary hover:before:opacity-100 hover:after:opacity-100",
      isActive && "text-primary before:opacity-100 after:opacity-100"
    );

  const handleScrollTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="flex justify-between items-center mb-2 py-2 shadow-header relative z-10">
      <Logo className="w-[180px] h-auto block overflow-visible mobile:w-[140px]" />
      <button className={clsx("hidden mobile:block bg-transparent border-none cursor-pointer z-20 py-4 px-2.5 relative")} onClick={toggleMenu} aria-label="Toggle menu">
        <span className={clsx("block w-[25px] h-[3px] bg-text rounded-sm relative transition-all duration-300", "before:content-[''] before:absolute before:w-[25px] before:h-[3px] before:bg-text before:rounded-sm before:transition-all before:duration-300 before:left-0 before:-top-2", "after:content-[''] after:absolute after:w-[25px] after:h-[3px] after:bg-text after:rounded-sm after:transition-all after:duration-300 after:left-0 after:-bottom-2", isMenuOpen && "bg-transparent before:rotate-45 before:top-0 after:-rotate-45 after:bottom-0")} />
      </button>
      <div className="flex gap-10 ml-auto mr-8 mobile:hidden">
        <Link href="/" className={navLinkClass(pathname === "/")}>Home</Link>
        <a href="#about-section" className={navLinkClass(false)} onClick={(e) => { e.preventDefault(); handleScrollTo("about-section"); }}>About</a>
        <a href="#faq-section" className={navLinkClass(false)} onClick={(e) => { e.preventDefault(); handleScrollTo("faq-section"); }}>FAQ</a>
        <a href="#contact-section" className={navLinkClass(false)} onClick={(e) => { e.preventDefault(); handleScrollTo("contact-section"); }}>Contact Us</a>
      </div>
      <div className="flex items-center gap-4 mobile:hidden">
        <Link href="/signin" className="font-open-sans text-[17px] bg-primary text-white border-none py-2 px-6 rounded-md cursor-pointer transition-all hover:bg-primary-hover inline-block text-center">Login</Link>
      </div>
      <div className={clsx("hidden", isMenuOpen && "mobile:flex mobile:flex-col mobile:fixed mobile:inset-0 mobile:w-full mobile:h-screen mobile:bg-white mobile:z-10 mobile:pt-20 mobile:pb-15 mobile:justify-between")}>
        <div className={clsx("hidden", isMenuOpen && "mobile:flex mobile:flex-col mobile:items-center mobile:justify-start mobile:m-0 mobile:p-8 mobile:pt-8 mobile:pb-4 mobile:flex-1")}>
          <Link href="/" className={clsx(navLinkClass(pathname === "/"), "mobile:py-5 mobile:text-xl mobile:font-medium")} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <a href="#about-section" className={clsx(navLinkClass(false), "mobile:py-5 mobile:text-xl mobile:font-medium")} onClick={(e) => { e.preventDefault(); handleScrollTo("about-section"); }}>About</a>
          <a href="#faq-section" className={clsx(navLinkClass(false), "mobile:py-5 mobile:text-xl mobile:font-medium")} onClick={(e) => { e.preventDefault(); handleScrollTo("faq-section"); }}>FAQ</a>
          <a href="#contact-section" className={clsx(navLinkClass(false), "mobile:py-5 mobile:text-xl mobile:font-medium")} onClick={(e) => { e.preventDefault(); handleScrollTo("contact-section"); }}>Contact Us</a>
        </div>
        <div className={clsx("hidden", isMenuOpen && "mobile:flex mobile:flex-col mobile:items-center mobile:justify-center mobile:mt-auto mobile:mb-8 mobile:px-8")}>
          <Link href="/signin" className="font-open-sans text-[17px] bg-primary text-white border-none py-3 px-8 rounded-md cursor-pointer transition-all hover:bg-primary-hover inline-block text-center mobile:w-[200px] mobile:text-lg mobile:font-semibold" onClick={() => setIsMenuOpen(false)}>Login</Link>
        </div>
      </div>
      {isMenuOpen && <div className="hidden mobile:block mobile:fixed mobile:inset-0 mobile:bg-black/50 mobile:z-[9]" onClick={toggleMenu} />}
    </nav>
  );
};
