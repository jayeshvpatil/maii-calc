# Overview

This is a full-stack TypeScript application built with React, Express, and PostgreSQL. The application serves as an AI efficiency calculator that helps users evaluate the potential impact of AI implementation on their business processes. It features a modern, component-based frontend using shadcn/ui components and a RESTful API backend with database integration through Drizzle ORM.

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
- **Calculator Interface**: Multi-section form for AI efficiency calculations
- **Real-time Calculations**: Client-side computation of efficiency metrics
- **Progress Tracking**: Visual feedback during calculation processes
- **Results Visualization**: Structured display of ROI and efficiency metrics
- **Export Functionality**: Data export capabilities for results
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

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