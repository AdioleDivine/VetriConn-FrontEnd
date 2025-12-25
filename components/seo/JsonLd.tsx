"use client";

/**
 * Schema.org type definitions for structured data
 */

export interface Organization {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
  contactPoint?: {
    "@type": "ContactPoint";
    contactType: string;
    availableLanguage?: string[];
  };
}

export interface SearchAction {
  "@type": "SearchAction";
  target: {
    "@type": "EntryPoint";
    urlTemplate: string;
  };
  "query-input": string;
}

export interface WebSite {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  potentialAction?: SearchAction;
}

export interface Place {
  "@type": "Place";
  address: {
    "@type": "PostalAddress";
    addressLocality?: string;
    addressRegion?: string;
    addressCountry: string;
  };
}

export interface MonetaryAmount {
  "@type": "MonetaryAmount";
  currency: string;
  value?: number;
  minValue?: number;
  maxValue?: number;
  unitText?: string;
}

export interface HiringOrganization {
  "@type": "Organization";
  name: string;
  logo?: string;
}

export interface JobPosting {
  "@context": "https://schema.org";
  "@type": "JobPosting";
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType?: string | string[];
  hiringOrganization: HiringOrganization;
  jobLocation?: Place;
  baseSalary?: MonetaryAmount;
  identifier?: {
    "@type": "PropertyValue";
    name: string;
    value: string;
  };
}

export type JsonLdData = Organization | WebSite | JobPosting;

interface JsonLdProps {
  data: JsonLdData;
}

/**
 * JsonLd Component
 * Renders JSON-LD structured data as a script tag for SEO
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

export default JsonLd;
