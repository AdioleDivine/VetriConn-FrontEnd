import UserIcon from "@/public/images/user.svg";
import UploadIcon from "@/public/images/upload.svg";
import BellIcon from "@/public/images/bell.svg";

const steps = [
  {
    icon: <UserIcon />,
    title: "Create Your Free Account",
    description: "Sign up in seconds to access job opportunities tailored to your skills and experience.",
  },
  {
    icon: <UploadIcon />,
    title: "Upload Your Credentials",
    description: "Easily upload your resume and any required certifications to complete your profile.",
  },
  {
    icon: <BellIcon />,
    title: "Get Matched and Notified",
    description: "Receive instant alerts when jobs that fit your profile go live—never miss an opportunity.",
  },
];

export const HowItWorksStepsSection = () => (
  <section className="bg-gray-50 py-14 w-full px-[5%] mobile:py-10">
    <div className="max-w-[1400px] mx-auto">
      <h2 className="heading-1 text-center mb-10 mobile:mb-8">How it works</h2>
      <div className="flex justify-between items-start gap-12 mobile:flex-col mobile:items-center mobile:gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center text-center py-8 px-6 pb-10 max-w-[400px] mobile:py-4 mobile:px-4 mobile:pb-6">
            <div className="mb-6 [&_svg]:w-[90px] [&_svg]:h-[90px] [&_svg]:block [&_svg]:overflow-visible [&_svg]:text-primary mobile:mb-4 mobile:[&_svg]:w-[60px] mobile:[&_svg]:h-[60px]">
              {step.icon}
            </div>
            <h3 className="heading-3 mb-4 mobile:mb-2">{step.title}</h3>
            <p className="font-open-sans text-base text-text-muted leading-relaxed mobile:text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
