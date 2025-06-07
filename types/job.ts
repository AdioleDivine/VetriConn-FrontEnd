import { Tag } from "./tag";

export interface Job {
  id: string;
  role: string;
  company_name: string;
  company_logo: string;
  tags: Tag[];
  full_description: string;
  responsibilities: string[];
  qualifications: string[];
}

// Re-export Tag for backward compatibility
export { Tag };
