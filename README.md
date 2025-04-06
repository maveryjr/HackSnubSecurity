# HackSnub - Cybersecurity for Small Businesses

A professional cybersecurity consulting platform offering interactive security assessments and affordable protection plans for small businesses.

## Project Setup

### Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL database
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DATABASE_URL=postgres://user:password@localhost:5432/hacksnub
PGHOST=localhost
PGPORT=5432
PGDATABASE=hacksnub
PGUSER=your_user
PGPASSWORD=your_password

# Email Service (SendGrid)
SENDGRID_API_KEY=your_sendgrid_key
```

### Installation

```bash
# Install dependencies
npm install

# Initialize the database
npm run db:push

# Start the development server
npm run dev
```

## Dependencies

This project uses the following key dependencies:

### Backend
- Express
- Drizzle ORM
- PostgreSQL
- SendGrid for email

### Frontend
- React
- Vite
- Tailwind CSS
- Shadcn/UI components
- TanStack Query
- Wouter for routing

## Complete Package.json

You can use this package.json for reference to ensure all dependencies are installed correctly:

```json
{
  "name": "hacksnub",
  "version": "1.0.0",
  "description": "Cybersecurity consulting platform for small businesses",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "tsx server/index.ts",
    "build": "vite build",
    "db:push": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.2",
    "@jridgewell/trace-mapping": "^0.3.19",
    "@neondatabase/serverless": "^0.6.0",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-aspect-ratio": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.3",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-collapsible": "^1.0.3",
    "@radix-ui/react-context-menu": "^2.1.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-hover-card": "^1.0.7",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-menubar": "^1.0.4",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^1.2.2",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-toggle-group": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@replit/vite-plugin-cartographer": "^1.0.0",
    "@replit/vite-plugin-runtime-error-modal": "^1.0.4",
    "@replit/vite-plugin-shadcn-theme-json": "^1.0.3",
    "@sendgrid/mail": "^7.7.0",
    "@tailwindcss/typography": "^0.5.10",
    "@tanstack/react-query": "^5.8.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "cmdk": "^0.2.0",
    "connect-pg-simple": "^9.0.0",
    "date-fns": "^2.30.0",
    "drizzle-kit": "^0.20.6",
    "drizzle-orm": "^0.29.0",
    "drizzle-zod": "^0.5.1",
    "embla-carousel-react": "^8.0.0-rc14",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "framer-motion": "^10.16.5",
    "input-otp": "^0.2.2",
    "lucide-react": "^0.292.0",
    "memorystore": "^1.6.7",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "postgres": "^3.4.3",
    "react": "^18.2.0",
    "react-day-picker": "^8.9.1",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.48.2",
    "react-icons": "^4.12.0",
    "react-resizable-panels": "^0.0.55",
    "recharts": "^2.10.0",
    "tailwind-merge": "^2.0.0",
    "tailwindcss": "^3.3.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.7.9",
    "vite": "^5.0.2",
    "wouter": "^2.12.1",
    "ws": "^8.14.2",
    "zod": "^3.22.4",
    "zod-validation-error": "^1.5.0"
  },
  "devDependencies": {
    "@types/connect-pg-simple": "^7.0.3",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.17.10",
    "@types/node": "^20.9.4",
    "@types/passport": "^1.0.16",
    "@types/passport-local": "^1.0.38",
    "@types/react": "^18.2.38",
    "@types/react-dom": "^18.2.17",
    "@types/ws": "^8.5.10",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "esbuild": "^0.19.7",
    "postcss": "^8.4.31",
    "tsx": "^4.1.4",
    "typescript": "^5.3.2"
  }
}
```

## Installation Scripts

You can use these scripts to quickly set up the project in a new environment:

### For npm users
```bash
# Install dependencies
npm install

# Set up PostgreSQL database and push schema
npm run db:push
```

### For yarn users
```bash
# Install dependencies
yarn

# Set up PostgreSQL database and push schema
yarn db:push
```

### Manual Dependencies Installation

If you need to install the dependencies manually, use these commands:

```bash
# Production dependencies
npm install @hookform/resolvers @jridgewell/trace-mapping @neondatabase/serverless @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @replit/vite-plugin-shadcn-theme-json @sendgrid/mail @tanstack/react-query class-variance-authority clsx cmdk connect-pg-simple date-fns drizzle-orm drizzle-zod embla-carousel-react express express-session framer-motion input-otp lucide-react memorystore openai passport passport-local postgres react react-day-picker react-dom react-hook-form react-icons react-resizable-panels recharts tailwind-merge tailwindcss-animate vaul wouter ws zod zod-validation-error

# Development dependencies
npm install @replit/vite-plugin-cartographer @replit/vite-plugin-runtime-error-modal @tailwindcss/typography @types/connect-pg-simple @types/express @types/express-session @types/node @types/passport @types/passport-local @types/react @types/react-dom @types/ws @vitejs/plugin-react autoprefixer drizzle-kit esbuild postcss tailwindcss tsx typescript vite --save-dev
```

## Database Setup

The project requires a PostgreSQL database. After setting up your PostgreSQL instance:

1. Create a database named 'hacksnub'
2. Configure the environment variables in the .env file
3. Run the database migration: `npm run db:push`

## Key Features

- Interactive security assessment tool
- Cybersecurity mascot onboarding tutorial
- Admin dashboard for lead and assessment management
- Dynamic pricing plans
- Email notifications via SendGrid

## Support

For any issues or questions, please refer to the project documentation or open an issue on the repository.