# Tailwind CSS Migration - Tasks

## Phase 1: Setup & Configuration
- [ ] 1.1 Install Tailwind CSS and dependencies (`tailwindcss`, `postcss`, `autoprefixer`)
- [ ] 1.2 Create `tailwind.config.ts` with custom theme
- [ ] 1.3 Create `postcss.config.js`
- [ ] 1.4 Update `app/globals.scss` → `app/globals.css` with Tailwind directives
- [ ] 1.5 Update `app/layout.tsx` to import new globals.css
- [ ] 1.6 Install `clsx` for conditional class handling

## Phase 2: Migrate UI Components (Simple → Complex)
- [ ] 2.1 Migrate `Avatar` component
- [ ] 2.2 Migrate `Skeleton` component
- [ ] 2.3 Migrate `Tooltip` component
- [ ] 2.4 Migrate `ErrorState` component
- [ ] 2.5 Migrate `Advert` component
- [ ] 2.6 Migrate `Accordion` component
- [ ] 2.7 Migrate `AttachmentCard` component
- [ ] 2.8 Migrate `FilePreview` component
- [ ] 2.9 Migrate `TestimonialCard` component
- [ ] 2.10 Migrate `PageHeader` component
- [ ] 2.11 Migrate `Toaster` component
- [ ] 2.12 Migrate `JobCard` component
- [ ] 2.13 Migrate `JobFilters` component
- [ ] 2.14 Migrate `JobDescriptor` component
- [ ] 2.15 Migrate `Header` component
- [ ] 2.16 Migrate `Footer` component
- [ ] 2.17 Migrate `DashboardNavbar` component

## Phase 3: Migrate Page Components
- [ ] 3.1 Migrate `HeroSection` (home)
- [ ] 3.2 Migrate `AboutSection` (home)
- [ ] 3.3 Migrate `BenefitsSection` (home)
- [ ] 3.4 Migrate `HowItWorksStepsSection` (home)
- [ ] 3.5 Migrate `FaqSection` (home)
- [ ] 3.6 Migrate `ContactSection` (home)
- [ ] 3.7 Migrate auth components (signin/signup forms)
- [ ] 3.8 Migrate profile components

## Phase 4: Migrate App Pages
- [ ] 4.1 Migrate `app/page.tsx` and `app/page.module.css`
- [ ] 4.2 Migrate `app/dashboard/` pages and styles
- [ ] 4.3 Migrate `app/jobs/` pages and styles
- [ ] 4.4 Migrate `app/signin/` pages and styles
- [ ] 4.5 Migrate `app/signup/` pages and styles
- [ ] 4.6 Migrate `app/test/` pages (if needed)

## Phase 5: Cleanup
- [ ] 5.1 Remove all `.module.scss` files
- [ ] 5.2 Remove `styles/variables.scss` and `styles/typography.scss`
- [ ] 5.3 Uninstall `sass` dependency
- [ ] 5.4 Update `package.json` scripts if needed
- [ ] 5.5 Update `README.md` with new tech stack
- [ ] 5.6 Update `context.md` documentation

## Phase 6: Testing & Verification
- [ ] 6.1 Visual regression testing - compare screenshots
- [ ] 6.2 Test all responsive breakpoints
- [ ] 6.3 Test all interactive states (hover, focus, active)
- [ ] 6.4 Test dark mode compatibility (if applicable)
- [ ] 6.5 Run build and fix any errors
- [ ] 6.6 Performance check - ensure no unused CSS bloat
