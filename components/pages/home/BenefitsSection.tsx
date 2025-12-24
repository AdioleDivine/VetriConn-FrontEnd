import CircleCheckIcon from "@/public/images/circle_check.svg";

const benefits = [
  {
    title: "More Convenient",
    description:
      "VetriConn's intuitive, user-friendly platform makes it simple to create a profile and apply for jobs, saving time, reducing stress, and streamlining the entire job search process. Whether you're looking for part-time work, volunteer opportunities, or ways to stay active and engaged, VetriConn helps you connect with meaningful roles quickly and effortlessly.",
  },
  {
    title: "More Connected",
    description:
      "At VetriConn, our platform is thoughtfully designed with our users at the center. With personalized job alerts and tailored opportunity notifications, users receive updates that align with their skills, preferences, and interests. \n VetriConn goes beyond generic listings, our platform curates opportunities specifically suited to our users' experience and lifestyle, making it easier to re-enter the workforce or stay actively engaged.",
  },
  {
    title: "Stronger Communities",
    description:
      "At VetriConn, satisfying the needs of our users comes first! \n By Connecting retirees and veterans with purposeful work and volunteer opportunities, we help strengthen communities. \n Organizations gain valuable experienced support, while our users find purpose, income, and connection, creating a true win-win for our communities and the Canadian economy.",
  },
];

export const BenefitsSection = () => (
  <div className="py-12 px-10 mobile:py-6 mobile:px-5">
    <h1 className="heading-1 mb-8 mobile:mb-5">Benefits of Using VetriConn</h1>
    {benefits.map((benefit, idx) => (
      <div key={idx} className="flex items-start gap-5 mb-9 mobile:gap-3 mobile:mb-6">
        <span className="text-2xl mt-0.5 text-gray-900 shrink-0 mobile:text-xl">
          <CircleCheckIcon />
        </span>
        <div>
          <strong className="heading-3 block mb-2 mobile:mb-1">{benefit.title}</strong>
          <p className="font-open-sans text-base text-text-muted leading-relaxed m-0 mobile:text-sm">
            {benefit.description.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
    ))}
  </div>
);
