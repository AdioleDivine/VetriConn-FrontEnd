import { Job } from "@/types/job";

const jobs: Job[] = [
  {
    id: "1",
    role: "Senior React Developer",
    company_name: "Tech Solutions",
    company_logo: "/images/company-logo.jpg",
    tags: [
      { name: "Full-time", color: "flutter" },
      { name: "Remote", color: "mobile" },
      { name: "React", color: "ios" },
      { name: "TypeScript", color: "android" },
    ],
    full_description:
      "We are looking for a Senior React Developer to join our growing team. You will be responsible for building user interfaces and implementing new features.",
    responsibilities: [
      "Develop new user-facing features using React and TypeScript",
      "Build reusable components and libraries for future use",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with team members and stakeholders",
      "Stay up-to-date with the latest industry trends and technologies",
    ],
    qualifications: [
      "3+ years of experience with React and TypeScript",
      "Strong proficiency in JavaScript and CSS",
      "Experience with responsive design and modern frontend tools",
      "Good understanding of web performance optimization",
      "Familiarity with RESTful APIs and state management libraries",
    ],
  },
  {
    id: "2",
    role: "Flutter Developer",
    company_name: "MobileTech Inc",
    company_logo: "/images/mobile-tech.jpg",
    tags: [
      { name: "Full-time", color: "flutter" },
      { name: "Onsite", color: "mobile" },
      { name: "Flutter", color: "dart" },
      { name: "Dart", color: "ios" },
    ],
    full_description:
      "MobileTech Inc is seeking a Flutter Developer to build cross-platform mobile applications for iOS and Android. Join our dynamic team creating innovative mobile solutions.",
    responsibilities: [
      "Develop and maintain mobile applications using Flutter",
      "Collaborate with the design team to implement UI/UX designs",
      "Integrate RESTful APIs and third-party services",
      "Debug and fix issues in existing applications",
      "Write clean, maintainable code following best practices",
    ],
    qualifications: [
      "2+ years of experience with Flutter and Dart",
      "Strong understanding of mobile app architecture",
      "Experience with state management solutions (Provider, Bloc, Redux)",
      "Knowledge of native Android/iOS development is a plus",
      "BSc in Computer Science or related field",
    ],
  },
  {
    id: "3",
    role: "UI/UX Designer",
    company_name: "Creative Studios",
    company_logo: "/images/creative-studios.jpg",
    tags: [
      { name: "Contract", color: "flutter" },
      { name: "Remote", color: "mobile" },
      { name: "Figma", color: "ios" },
      { name: "Adobe", color: "android" },
    ],
    full_description:
      "Creative Studios is looking for a talented UI/UX Designer to create beautiful, intuitive interfaces for web and mobile applications. You will work closely with developers and stakeholders to turn ideas into functional designs.",
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Develop user personas and journey maps",
      "Create design systems and style guides",
      "Collaborate with development team to ensure design implementation",
    ],
    qualifications: [
      "3+ years of experience in UI/UX design",
      "Proficiency in Figma, Adobe XD, or Sketch",
      "Strong portfolio demonstrating your design process",
      "Understanding of responsive design principles",
      "Knowledge of HTML/CSS is a plus",
    ],
  },
  {
    id: "4",
    role: "Backend Developer",
    company_name: "ServerSide Inc",
    company_logo: "/images/serverside.jpg",
    tags: [
      { name: "Full-time", color: "flutter" },
      { name: "Hybrid", color: "mobile" },
      { name: "Node.js", color: "ios" },
      { name: "MongoDB", color: "android" },
    ],
    full_description:
      "ServerSide Inc is seeking a skilled Backend Developer to build and maintain server-side logic for our web applications. You will be responsible for designing APIs, implementing database schemas, and ensuring high performance.",
    responsibilities: [
      "Design and develop RESTful APIs",
      "Create and maintain database schemas",
      "Implement authentication and authorization mechanisms",
      "Optimize application performance and scalability",
      "Collaborate with frontend developers to integrate user-facing elements",
    ],
    qualifications: [
      "3+ years of experience in backend development",
      "Proficiency in Node.js and Express.js",
      "Experience with MongoDB or other NoSQL databases",
      "Knowledge of authentication and security best practices",
      "Understanding of CI/CD pipelines",
    ],
  },
  {
    id: "5",
    role: "DevOps Engineer",
    company_name: "CloudNative Solutions",
    company_logo: "/images/cloudnative.jpg",
    tags: [
      { name: "Full-time", color: "flutter" },
      { name: "Remote", color: "mobile" },
      { name: "AWS", color: "ios" },
      { name: "Kubernetes", color: "android" },
    ],
    full_description:
      "CloudNative Solutions is looking for a DevOps Engineer to help automate our infrastructure and deployment processes. You will work on building robust CI/CD pipelines and managing cloud infrastructure.",
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage and optimize cloud infrastructure on AWS",
      "Set up monitoring and alerting systems",
      "Automate manual processes using scripts and tools",
      "Collaborate with development teams to improve deployment processes",
    ],
    qualifications: [
      "3+ years of experience in DevOps or SRE roles",
      "Strong knowledge of AWS services",
      "Experience with container orchestration (Kubernetes, Docker)",
      "Proficiency in infrastructure as code (Terraform, CloudFormation)",
      "Scripting skills in Python, Bash, or similar languages",
    ],
  },
];

export default jobs;
