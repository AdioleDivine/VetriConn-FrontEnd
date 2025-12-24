# Tailwind CSS Migration - Requirements

## Overview
Migrate the VetriConn frontend from SCSS Modules to Tailwind CSS while preserving all existing styles, themes, and visual appearance.

## Goals
1. Replace all SCSS module files with Tailwind utility classes
2. Maintain exact visual parity with current design
3. Preserve the existing design system (colors, typography, spacing)
4. Keep all TypeScript types and component logic intact
5. Improve maintainability with Tailwind's utility-first approach

## Current State
- **Styling:** SCSS Modules (`.module.scss` files)
- **Design Tokens:** `styles/variables.scss` and `styles/typography.scss`
- **Components:** ~20+ components across `components/ui/` and `components/pages/`

## Design System to Preserve

### Colors
- Primary: `#e53e3e` (red)
- Primary Hover: `#dc2626`
- Text: `#1f2937`
- Light Gray: `#f3f4f6`
- Gray 500: `#6b7280`
- Gray Background: `#f9f9f9`
- Gray Border: `#d1d5db`
- Label Color: `#686b6f`

### Typography
- Headings: Lato (weights: 300, 400, 700, 900)
- Body: Open Sans (weights: 300, 400, 600, 700)
- Heading 1: 3rem, 700 weight
- Heading 2: 25px, 700 weight
- Heading 3: 1.25rem, 600 weight
- Body text: 15px, 400 weight
- Subtitle: 1.25rem, 400 weight

### Breakpoints
- Mobile: 850px

### Spacing
- Standard padding: `0.5rem 5% 2rem`
- Container max-width: 1400px

## Components to Migrate

### UI Components (`components/ui/`)
- [ ] Accordion
- [ ] Advert
- [ ] AttachmentCard
- [ ] Avatar
- [ ] DashboardNavbar
- [ ] ErrorState
- [ ] FilePreview
- [ ] Footer
- [ ] Header
- [ ] JobCard
- [ ] JobDescriptor
- [ ] JobFilters
- [ ] PageHeader
- [ ] Skeleton
- [ ] TestimonialCard
- [ ] Toaster
- [ ] Tooltip

### Page Components (`components/pages/`)
- [ ] auth/ (SignIn, SignUp forms)
- [ ] home/ (HeroSection, AboutSection, BenefitsSection, ContactSection, FaqSection, HowItWorksStepsSection)
- [ ] profile/

### App Pages
- [ ] app/page.tsx (Home)
- [ ] app/layout.tsx
- [ ] app/globals.scss → globals.css
- [ ] app/dashboard/
- [ ] app/jobs/
- [ ] app/signin/
- [ ] app/signup/

## Migration Strategy
1. Install and configure Tailwind CSS
2. Create Tailwind config with custom theme (colors, fonts, breakpoints)
3. Migrate global styles first
4. Migrate components one by one, starting with smallest/simplest
5. Remove SCSS files after each component is migrated
6. Test visual parity after each migration
7. Clean up unused SCSS dependencies

## Success Criteria
- All components render identically to current design
- No SCSS module files remain
- Tailwind config contains all design tokens
- Build succeeds without style-related errors
- Responsive behavior preserved
