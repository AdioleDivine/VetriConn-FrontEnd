import { Tag } from "./tag";

export interface Job {
  id: string;
  role: string;
  company_name: string;
  company_logo: string;
  location: string; // Dedicated location field for filtering
  salary?: {
    symbol: string;
    number: number;
    currency: string;
  };
  salary_range?: {
    start_salary: {
      symbol: string;
      number?: number;
      currency: string;
    };
    end_salary: {
      symbol: string;
      number?: number;
      currency: string;
    };
  };
  tags: Tag[];
  full_description: string;
  responsibilities: string[];
  qualifications: string[];
  applicationLink?: string; // Optional application link
}

// Re-export Tag for backward compatibility
export type { Tag };
