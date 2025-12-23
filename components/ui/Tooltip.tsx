"use client";
import React, { useState, useRef } from "react";
import clsx from "clsx";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  showArrow?: boolean;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, showArrow, className }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span className={clsx("relative inline-block", className)} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onFocus={() => setVisible(true)} onBlur={() => setVisible(false)} tabIndex={0} ref={ref}>
      {children}
      {visible && (
        <span className="absolute left-1/2 bottom-[120%] -translate-x-1/2 bg-gray-900 text-white py-2 px-4 rounded-md text-sm whitespace-nowrap z-50 opacity-95 pointer-events-none transition-opacity duration-200" role="tooltip">
          {content}
          {showArrow && <span className="absolute left-1/2 top-full -translate-x-1/2 w-3 h-1.5 overflow-hidden"><span className="block w-3 h-3 bg-gray-900 rotate-45 -translate-y-1.5 mx-auto" /></span>}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
