# VetriConn Frontend - Project Context Documentation

## Project Overview

**VetriConn** is a job board platform connecting talent to meaningful causes. The frontend is built with Next.js 15.3.2 and React 19, focusing on modern web development practices with TypeScript and SCSS modules.

### Repository Information

- **Name**### Assets & Resources

### Images

- **Company Logos**: Stored in `/public/images/`
- **Icons**: SVG format with optimized sizes
- **Hero Graphics**: Custom illustrations for homepage
- **Favicon**: Site favicon available in two variants:
  - `/public/favicon.svg` - Original red favicon
  - `/public/favicon-white.svg` - White version for backgrounds and watermarksConn-FrontEnd
- **Owner**: VetriConn
- **Current Branch**: dev
- **Project Type**: Next.js Application with App Router

## Technical Stack

### Core Technologies

- **Next.js**: 15.3.2 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Node.js**: 20+
- **Package Manager**: pnpm (based on pnpm-lock.yaml)

### Styling & UI

- **SCSS**: 1.88.0 (with CSS Modules)
- **Google Fonts**: Lato (headings) and Open Sans (body text)
- **Icons**: React Icons 5.5.0
- **Animations**: Framer Motion 12.23.6

### Development Tools

- **ESLint**: 9.x with Next.js config
- **TypeScript**: Strict configuration
- **SVGR**: 8.1.0 for SVG handling

## Project Structure

```
/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout with font configuration
│   ├── page.tsx               # Homepage
│   ├── globals.scss           # Global styles
│   ├── dashboard/             # Dashboard pages
│   │   ├── page.tsx          # Main dashboard
│   │   └── page.module.scss  # Dashboard styles
│   ├── jobs/                  # Job-related pages
│   │   ├── page.tsx          # Jobs listing
│   │   └── [id]/             # Dynamic job details
│   ├── signin/                # Authentication pages
│   │   ├── page.tsx          # Desktop sign-in
│   │   └── mobile/           # Mobile sign-in
│   └── signup/                # Registration pages
│       ├── page.tsx          # Desktop sign-up
│       └── mobile/           # Mobile sign-up
├── components/                # Reusable components
│   ├── pages/                # Page-specific components
│   │   ├── auth/             # Authentication components
│   │   └── home/             # Homepage sections
│   ├── ui/                   # UI components library
│   │   ├── Avatar/           # User avatar component
│   │   ├── JobCard/          # Job listing card
│   │   ├── JobDescriptor/    # Job detail view
│   │   ├── JobFilters/       # Job filtering interface
│   │   ├── Header/           # Site header/navigation
│   │   ├── Footer/           # Site footer
│   │   └── ...               # Other UI components
│   └── test/                 # Test components
├── lib/                      # Utility functions and data
│   └── jobs.ts              # Sample job data
├── styles/                   # Global styles and utilities
│   ├── variables.scss       # SCSS variables and colors
│   └── typography.scss      # Typography mixins and styles
├── types/                    # TypeScript type definitions
│   ├── job.ts              # Job interface
│   ├── tag.ts              # Tag interface
│   ├── component.ts        # Component types
│   └── svg.d.ts            # SVG type declarations
└── public/                   # Static assets
    ├── favicon.svg          # Site favicon
    ├── Hero.svg            # Hero section graphic
    └── images/             # Image assets
```

## Design System

### Typography System

The project uses a comprehensive typography system with Google Fonts:

#### Font Families

- **Lato**: Used for headings and titles
  - Weights: 300, 400, 700, 900
  - Variable: `--font-lato`
- **Open Sans**: Used for body text and descriptions
  - Weights: 300, 400, 600, 700
  - Variable: `--font-open-sans`

#### Typography Mixins (styles/typography.scss)

```scss
@mixin heading-1 // 3rem, 700 weight, Lato
  @mixin heading-2 // 25px, 700 weight, Lato
  @mixin heading-3 // 1.25rem, 600 weight, Lato
  @mixin body-text // 15px, 400 weight, Open Sans
  @mixin subtitle // 1.25rem, 400 weight, Open Sans
  @mixin text-medium // 600 weight, Lato
  @mixin soft-text; // 12px, 400 weight, Lato
```

### Color Scheme

#### Primary Colors

- **Primary**: `#e53e3e` (Red from logo)
- **Primary Hover**: `#dc2626`
- **Text Color**: `#1f2937`

#### Neutral Colors

- **Light Gray**: `#f3f4f6`
- **Gray 500**: `#6b7280`
- **Gray Background**: `#f9f9f9`
- **Gray Border**: `#d1d5db`
- **Label Color**: `#686b6f`

#### Background Colors

- **Dashboard**: `#f9fafb`
- **Cards**: `#ffffff`
- **Filters Panel**: `#f5f5f5`

### Layout System

#### Responsive Breakpoints

- **Mobile**: `max-width: 850px`
- **Tablet**: `max-width: 768px`
- **Desktop**: `1400px max-width container`

#### Spacing System

- **Standard Padding**: `2rem` (horizontal)
- **Container Max Width**: `1400px`
- **Component Gap**: `2rem` (desktop), `1.5rem` (tablet), `1rem` (mobile)

## Component Architecture

### Component Organization

Components are organized into three main categories:

1. **UI Components** (`components/ui/`): Reusable UI elements
2. **Page Components** (`components/pages/`): Page-specific sections
3. **Layout Components**: Headers, footers, navigation

### Styling Conventions

- **CSS Modules**: Each component has its own `.module.scss` file
- **BEM-like Naming**: Descriptive class names with camelCase
- **SCSS Imports**: Variables and mixins imported at the top
- **Responsive Design**: Mobile-first approach with breakpoint mixins

Example component structure:

```
JobCard/
├── index.tsx           # Component logic
└── index.module.scss   # Component styles
```

### Key Components

#### JobCard

- **Purpose**: Display job listings in cards
- **Variants**: `default` and `sidebar`
- **Features**: Avatar, tags, bookmarking, selection state
- **Responsive**: Adapts layout for mobile/desktop

#### JobDescriptor

- **Purpose**: Detailed job view with full description
- **Layout**: Centered header, company info, tags, detailed sections
- **Background**: Matches filter panel (`#f5f5f5`)
- **Typography**: Professional hierarchy with precise spacing

#### JobFilters

- **Purpose**: Search and filter jobs interface
- **Features**: Text search, category filters, location filters
- **Layout**: Consistent with main container padding

#### Dashboard Layout

- **Structure**: Sidebar + Main content
- **Responsive**: Stacks vertically on mobile
- **Sidebar**: Fixed width (380px) for job cards
- **Main**: Flexible width for job details

## Data Models

### Job Interface

```typescript
interface Job {
  id: string;
  role: string;
  company_name: string;
  company_logo: string;
  tags: Tag[];
  full_description: string;
  responsibilities: string[];
  qualifications: string[];
}
```

### Tag Interface

```typescript
interface Tag {
  name: string;
  color?: string;
}
```

### Supported Tag Colors

- `flutter`: Blue (`#e7f5ff` / `#1c7ed6`)
- `mobile`: Purple (`#f3f0ff` / `#7950f2`)
- `ios`: Green (`#e6fcf5` / `#12b886`)
- `android`: Yellow (`#fff9db` / `#fab005`)
- `dart`: Cyan (`#e3fafc` / `#15aabf`)

## Development Practices

### File Naming Conventions

- **Components**: PascalCase directory names with `index.tsx`
- **Styles**: `index.module.scss` for component styles
- **Types**: Descriptive names in `types/` directory
- **Pages**: Next.js App Router conventions

### Code Organization

- **Imports**: External libraries first, then internal modules
- **Types**: Defined in separate files and imported
- **Styling**: SCSS modules with imported variables/mixins
- **State Management**: React hooks (useState, useMemo, useCallback)

### Performance Optimizations

- **Next.js Font Optimization**: Automatic font loading and optimization
- **Image Optimization**: Next.js Image component (when used)
- **Code Splitting**: Automatic with Next.js App Router
- **Memoization**: useMemo for expensive computations

## Key Features

### Dashboard Functionality

- **Job Filtering**: By location, experience, remote work, and search
- **Job Sorting**: By title, company, date created/updated
- **Job Selection**: Click to view detailed job information
- **Responsive Design**: Mobile-optimized layout

### Authentication System

- **Desktop/Mobile Variants**: Separate layouts for different devices
- **Sign In/Sign Up**: Complete authentication flow
- **Responsive Forms**: Optimized for various screen sizes

### Homepage Sections

- **Hero Section**: Main landing area with call-to-action and auto-changing image carousel
  - **Carousel Background**: Red decorative pseudo-element with centered white favicon (200px × 200px)
  - **Favicon Asset**: `/public/favicon-white.svg` - white version of the site favicon for watermark effect
  - **Mobile Behavior**: Carousel background hidden on mobile devices
- **About Section**: Company/platform information
- **How It Works**: Step-by-step process explanation
- **Testimonials**: User reviews and feedback
- **Contact Section**: Contact information and form
- **FAQ Section**: Frequently asked questions

## Recent Updates & Improvements

### Hero Section Enhancements

- **Favicon Background**: Added white favicon as centered background image to hero carousel's red decorative element
- **Asset Creation**: Created `/public/favicon-white.svg` - white version of site favicon for watermark effect
- **Background Sizing**: 200px × 200px centered background with no-repeat positioning
- **Responsive Design**: Favicon background hidden on mobile devices for optimal performance

### Typography Enhancements

- Updated font loading system with extended weight ranges
- Implemented comprehensive typography mixin system
- Consistent font application across all components

### Dashboard Layout Improvements

- Redesigned JobDescriptor with centered layout and consistent background
- Implemented uniform padding system (2rem horizontal)
- Fine-tuned spacing for professional appearance
- Reduced company name font size to 14px with light weight (300)

### Responsive Design Refinements

- Mobile-first responsive breakpoints
- Flexible layout system that adapts to screen sizes
- Consistent spacing and typography across devices

## Configuration Files

### Package.json

- **Scripts**: Standard Next.js development commands
- **Dependencies**: Core runtime dependencies
- **DevDependencies**: Development and build tools

### TypeScript Configuration

- **Strict Mode**: Enabled for type safety
- **Path Mapping**: Absolute imports with `@/` prefix
- **Next.js Integration**: Optimized for App Router

### ESLint Configuration

- **Next.js Rules**: Extended from `eslint-config-next`
- **TypeScript Support**: Integrated TypeScript linting
- **Modern Standards**: ES2022+ syntax support

## Assets & Resources

### Images

- **Company Logos**: Stored in `/public/images/`
- **Icons**: SVG format with optimized sizes
- **Hero Graphics**: Custom illustrations for homepage

### Fonts

- **Google Fonts**: Lato and Open Sans families
- **Fallbacks**: System fonts for progressive enhancement
- **Optimization**: Next.js automatic font optimization

## Best Practices

### Component Development

1. **Single Responsibility**: Each component has a clear purpose
2. **Prop Typing**: Comprehensive TypeScript interfaces
3. **Accessibility**: ARIA labels and semantic HTML
4. **Performance**: Memoization and efficient re-renders

### Styling Guidelines

1. **CSS Modules**: Scoped styles to prevent conflicts
2. **SCSS Variables**: Centralized design tokens
3. **Responsive Design**: Mobile-first media queries
4. **Consistent Spacing**: Standardized margin/padding system

### Code Quality

1. **TypeScript**: Strict typing for better development experience
2. **ESLint**: Automated code quality checks
3. **Component Documentation**: Clear prop interfaces and comments
4. **File Organization**: Logical directory structure

This documentation provides a comprehensive overview of the VetriConn frontend codebase, including architecture decisions, design patterns, and development practices. It serves as a reference for developers working on the project and ensures consistency across the development team.
