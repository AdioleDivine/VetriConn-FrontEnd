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
  <section className="bg-gray-50 py-14 w-full">
    <div className="max-w-[1300px] mx-auto px-8">
      <h2 className="font-lato text-heading-1 text-text text-center mb-10">How it works</h2>
      <div className="flex justify-between items-start gap-8 mobile:flex-col mobile:items-center mobile:gap-10">
        {steps.map((step, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center text-center py-8 px-6 pb-10">
            <div className="mb-6 [&_svg]:w-[90px] [&_svg]:h-[90px] [&_svg]:block [&_svg]:overflow-visible [&_svg]:text-primary">
              {step.icon}
            </div>
            <h3 className="font-lato text-heading-2 text-text mb-4">{step.title}</h3>
            <p className="font-open-sans text-base text-text-muted leading-relaxed max-w-[350px]">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
