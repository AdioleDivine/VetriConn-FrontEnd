"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import clsx from "clsx";

const Advert = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className={clsx("flex bg-[#DD342E1F] text-[#DD342E] rounded-[10px] py-0.5 px-6 items-center justify-between gap-4")}>
      <p className="flex items-center gap-1">
        <span className="font-lato font-semibold text-base">We are conducting Product Research |</span>
        <Link href="https://forms.gle/Bdwab4EUHJ2eAUu88" target="_blank" rel="noopener noreferrer" className="font-lato text-[15px] font-normal text-[#DD342E] underline hover:text-[#e54a45]">Take the survey to help us launch better</Link>
      </p>
      <IoIosClose title="close" onClick={() => setIsOpen(false)} className="text-[25px] cursor-pointer hover:scale-90 hover:text-[#b82a25] transition-transform" />
    </div>
  );
};

export default Advert;
