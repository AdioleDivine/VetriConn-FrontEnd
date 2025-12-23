import Image from "next/image";
import Logo from "@/public/images/logo_1.svg";
import { FiLinkedin } from "react-icons/fi";
import { LiaFacebookF } from "react-icons/lia";
import clsx from "clsx";

const Footer = () => {
  return (
    <footer className="bg-[#f2f2f2] px-[5%] pt-10 pb-6 rounded-b-lg box-border w-full">
      <div className="flex justify-between items-start gap-8 flex-wrap mobile:flex-col">
        <div className="flex-[1_1_300px] min-w-[220px]">
          <div className="flex items-center gap-2 mb-2"><Logo className="w-[162px] h-auto block overflow-visible" /></div>
          <Image src="/badge.svg" alt="Pipeda Certification Badge" height={40} width={140} />
        </div>
        <div className="flex gap-12 mobile:gap-8">
          <div className="flex flex-col gap-2">
            <div className="font-open-sans text-base font-bold text-text mb-1">Privacy & Policies</div>
            <a target="_blank" href="https://vetriconntandc.notion.site/VETRICONN-INC-TERMS-AND-CONDITIONS-22ac6380202c807fa63ef48c7ca69815" className="font-open-sans text-[15px] text-text opacity-80 no-underline transition-colors duration-200 hover:text-primary">Terms & Conditions</a>
            <a href="#" className="font-open-sans text-[15px] text-text opacity-80 no-underline transition-colors duration-200 hover:text-primary">Privacy Guide</a>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-open-sans text-base font-bold text-text mb-1">Company</div>
            <a href="#" className="font-open-sans text-[15px] text-text opacity-80 no-underline transition-colors duration-200 hover:text-primary">About Us</a>
            <a href="#" className={clsx("font-open-sans text-[15px] text-text no-underline transition-colors duration-200", "opacity-40 pointer-events-none")}>Careers</a>
            <a href="#" className={clsx("font-open-sans text-[15px] text-text no-underline transition-colors duration-200", "opacity-40 pointer-events-none")}>FAQs</a>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-[#e8e8e8] rounded-lg py-3 px-6 flex items-center justify-between flex-wrap mobile:flex-col mobile:gap-4 mobile:items-center">
        <div className="font-open-sans text-sm font-normal text-primary">Vetriconn © 2025 All rights Reserved.</div>
        <div className="flex gap-5">
          <a href="https://www.facebook.com/profile.php?id=61580233844003" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-primary text-[1.7rem] transition-colors duration-200 hover:text-primary-hover"><LiaFacebookF /></a>
          <a href="https://www.linkedin.com/company/vetriconn-inc/?viewAsMember=true" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-primary text-[1.7rem] transition-colors duration-200 hover:text-primary-hover"><FiLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
