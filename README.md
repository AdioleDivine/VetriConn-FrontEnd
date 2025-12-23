# VetriConn Frontend

A job board platform connecting Canadian retirees and veterans with meaningful work opportunities.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** SCSS Modules
- **Animations:** Framer Motion
- **Data Fetching:** SWR
- **Validation:** Zod

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
pnpm build
```

### Production

```bash
pnpm start
```

## Project Structure

```
app/                  # Next.js App Router pages
├── dashboard/        # User dashboard
├── jobs/             # Job listings
├── signin/           # Authentication
└── signup/

components/
├── pages/            # Page-specific components
└── ui/               # Reusable UI components

hooks/                # Custom React hooks
lib/                  # API client & utilities
types/                # TypeScript definitions
styles/               # Global SCSS variables & mixins
```

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=your_api_url
```
