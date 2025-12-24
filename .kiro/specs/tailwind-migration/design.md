# Tailwind CSS Migration - Design

## Tailwind Configuration

### Custom Theme Extension

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e53e3e',
          hover: '#dc2626',
        },
        gray: {
          bg: '#f9f9f9',
          border: '#d1d5db',
          label: '#686b6f',
        },
      },
      fontFamily: {
        lato: ['var(--font-lato)', 'Lato', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['25px', { lineHeight: '1', fontWeight: '700' }],
        'heading-3': ['1.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'body': ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        'subtitle': ['1.25rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      maxWidth: {
        'container': '1400px',
      },
      screens: {
        'mobile': { max: '850px' },
      },
      boxShadow: {
        'header': '0 4px 2px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}

export default config
```

## Component Migration Pattern

### Before (SCSS Module)
```tsx
// Component.tsx
import styles from './index.module.scss'

const Component = () => (
  <div className={styles.container}>
    <h1 className={styles.heading}>Title</h1>
  </div>
)
```

### After (Tailwind)
```tsx
// Component.tsx
const Component = () => (
  <div className="max-w-container mx-auto px-8">
    <h1 className="font-lato text-heading-1 text-gray-800 mb-6">Title</h1>
  </div>
)
```

## Utility Class Mappings

### Typography Mixins → Tailwind Classes
| SCSS Mixin | Tailwind Classes |
|------------|------------------|
| `@include heading-1` | `font-lato text-heading-1` |
| `@include heading-2` | `font-lato text-heading-2` |
| `@include heading-3` | `font-lato text-heading-3` |
| `@include body-text` | `font-open-sans text-body` |
| `@include subtitle` | `font-open-sans text-subtitle` |
| `@include base-text` | `font-open-sans text-[17px]` |

### Common Patterns
| SCSS Pattern | Tailwind Classes |
|--------------|------------------|
| `display: flex; justify-content: space-between; align-items: center` | `flex justify-between items-center` |
| `padding: 2rem 5%` | `py-8 px-[5%]` |
| `max-width: 1400px; margin: 0 auto` | `max-w-container mx-auto` |
| `@media (max-width: 850px)` | `mobile:` prefix |
| `background: #e53e3e` | `bg-primary` |
| `color: #1f2937` | `text-gray-800` |

## File Structure After Migration

```
app/
├── globals.css          # Tailwind directives + global styles
├── layout.tsx
└── ...

components/
├── ui/
│   ├── Header/
│   │   └── index.tsx    # No more .module.scss
│   └── ...
└── pages/
    └── ...

styles/                  # Can be removed after migration
tailwind.config.ts       # New config file
postcss.config.js        # PostCSS config for Tailwind
```

## Conditional Classes Pattern

Using `clsx` or template literals for conditional classes:

```tsx
import clsx from 'clsx'

const Button = ({ variant, disabled }) => (
  <button
    className={clsx(
      'px-6 py-3 rounded-lg font-semibold transition-colors',
      variant === 'primary' && 'bg-primary text-white hover:bg-primary-hover',
      variant === 'secondary' && 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      disabled && 'opacity-50 cursor-not-allowed'
    )}
  >
    Click me
  </button>
)
```

## Responsive Design Pattern

```tsx
// Mobile-first with Tailwind
<div className="flex flex-col mobile:flex-row gap-4 mobile:gap-8">
  <div className="w-full mobile:w-1/2">...</div>
</div>
```

Note: Since the current design uses `max-width: 850px` for mobile, we'll use a custom `mobile:` breakpoint that applies styles below 850px.
