import JobCard from "@/components/ui/JobCard";
import styles from "./index.module.scss";

 const JobNoticeboard = () => {
  const jobs = [
    {
      role: "Software Developer",
      name: "Tech Innovators Inc.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      tags: [
        { name: "Flutter", color: "flutter" },
        { name: "Dart", color: "dart" },
        { name: "Mobile", color: "mobile" },
        { name: "iOS/Android", color: "ios" },
      ],
    },
    {
      role: "Frontend Engineer",
      name: "Creative Solutions",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tags: [
        { name: "React", color: "react" },
        { name: "Web", color: "web" },
      ],
    },
    {
      role: "UX Designer",
      name: "Design Masters",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      tags: [
        { name: "UI/UX", color: "flutter" },
        { name: "Figma", color: "mobile" },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Job Noticeboard</h2>
      <div className={styles.grid}>
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            role={job.role}
            name={job.name}
            description={job.description}
            tags={job.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default JobNoticeboard;
