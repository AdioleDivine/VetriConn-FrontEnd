"use client";
import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = "100%", height = "20px", borderRadius = "4px", className = "" }) => {
  return <div className={clsx("inline-block animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200px_100%]", className)} style={{ width, height, borderRadius }} />;
};

export const ProfileHeaderSkeleton: React.FC = () => (
  <div className="flex items-center justify-between gap-6 p-8 bg-white tablet:flex-col tablet:gap-6 tablet:px-6 sm:p-5 sm:gap-2">
    <div className="flex items-center gap-6 flex-1 tablet:w-full tablet:gap-6 sm:gap-2">
      <div className="relative shrink-0"><Skeleton width="120px" height="120px" borderRadius="50%" /></div>
      <div className="flex-1 flex flex-col gap-2 tablet:items-start tablet:text-left tablet:gap-1.5 sm:gap-1">
        <Skeleton width="200px" height="28px" borderRadius="6px" />
        <Skeleton width="150px" height="20px" borderRadius="4px" />
        <Skeleton width="180px" height="16px" borderRadius="4px" />
        <div className="flex gap-2 mt-2">
          <Skeleton width="24px" height="24px" borderRadius="4px" />
          <Skeleton width="24px" height="24px" borderRadius="4px" />
          <Skeleton width="24px" height="24px" borderRadius="4px" />
        </div>
      </div>
    </div>
    <div className="shrink-0 tablet:w-full"><Skeleton width="100%" height="36px" borderRadius="6px" /></div>
  </div>
);

export const ProfileStatsSkeleton: React.FC = () => (
  <div className="grid grid-cols-4 bg-white border border-gray-200 rounded-lg mx-8 my-6 overflow-hidden lg:mx-6 lg:my-7 md:grid-cols-2 md:mx-4 md:my-6 tablet:mx-3 tablet:my-3 sm:mx-2 sm:my-2 xs:grid-cols-1 xs:mx-1.5">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="p-6 border-r border-gray-200 flex flex-col gap-1.5 last:border-r-0 md:border-b md:border-gray-200 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-child(3)]:border-b-0 md:[&:nth-child(4)]:border-b-0 tablet:p-3 sm:p-2.5 xs:border-r-0 xs:border-b xs:last:border-b-0">
        <Skeleton width="80px" height="16px" borderRadius="4px" />
        <Skeleton width={i === 4 ? "80px" : "100px"} height="20px" borderRadius={i === 4 ? "12px" : "4px"} />
      </div>
    ))}
  </div>
);
