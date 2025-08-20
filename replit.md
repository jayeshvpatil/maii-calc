# Overview

This is a full-stack TypeScript application built with React, Express, and PostgreSQL. The application serves as an AI Value Calculator that helps users calculate the business value and ROI of AI training for both individuals and teams. It features a modern, tabbed interface with separate calculators for individual and team scenarios, built using shadcn/ui components and following the exact calculation logic from provided Excel specifications.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation integration

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with `/api` prefix routing
- **Development**: Hot module replacement via Vite integration
- **Error Handling**: Centralized error middleware with status code mapping

## Data Storage
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database schema management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple

## Component Design System
- **Design System**: Custom implementation based on shadcn/ui "new-york" style
- **Theme**: CSS custom properties for dynamic theming support
- **Typography**: Inter font family with fallbacks
- **Icons**: Lucide React icon library
- **Accessibility**: ARIA-compliant components via Radix UI

## Application Features
- **Dual Calculator Interface**: Separate tabs for Individual and Team AI value calculations
- **Excel-based Calculations**: Exact implementation of provided Excel formulas for accuracy
- **Three-part Analysis Structure**: Value Analysis, Cost Analysis, and Net Value Estimate sections
- **Real-time Results**: Immediate calculation and display of business metrics
- **Comprehensive Insights**: Context-aware recommendations based on input parameters

- **Responsive Design**: Mobile-first approach with professional business styling

## Calculator Structure

### Individual Calculator
- **Part 1 - Value Analysis**: Annual compensation, work hours, value multiplier, productivity lift
- **Part 2 - Cost Analysis**: Training hours, license fees, tech costs
- **Part 3 - Net Value**: First-year net value and ROI calculations

### Team Calculator
- **Part 1 - Value Analysis**: Number of learners, combined compensation, productivity metrics
- **Part 2 - Cost Analysis**: Per-learner training costs and combined totals
- **Part 3 - Net Value**: Team-wide productivity lift value and ROI

# External Dependencies

## Frontend Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **wouter**: Lightweight routing library
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Runtime type validation
- **date-fns**: Date manipulation utilities
- **lucide-react**: Icon components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility

## Backend Dependencies
- **express**: Web application framework
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store
- **drizzle-zod**: Zod schema generation from Drizzle schemas

## Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **drizzle-kit**: Database migration management
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tools

## Database Integration
- **PostgreSQL**: Primary database with Neon serverless hosting
- **Connection Management**: Environment variable-based configuration
- **Schema Validation**: Shared TypeScript types between frontend and backend
- **Migration Strategy**: Code-first schema management with Drizzle Kit