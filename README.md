# 🌿 Oliva Table

A modern, bilingual restaurant website with a complete online ordering experience, built with React, TypeScript, and Supabase.

**Live Demo:** [Oliva Table](https://oliva-table.vercel.app/)

**GitHub Repository:** [oliva-table](https://github.com/walaaosamamoh/oliva-table)

---

## Overview

Oliva Table is a full-stack restaurant web application inspired by Mediterranean dining. It provides customers with an intuitive experience to explore the menu, discover dishes, manage their shopping cart, and place delivery or pickup orders.

The application supports English and Arabic, including right-to-left (RTL) layouts, and uses Supabase for database management and order processing.

## Features

### Customer Experience
- Responsive design for mobile, tablet, and desktop.
- Modern restaurant homepage and menu browsing.
- Dish details with descriptions, images, and prices.
- Menu search and category filtering.
- Shopping cart with quantity management.
- Checkout with delivery and pickup options.
- Order confirmation with a unique order number.
- Guest order tracking using order number and phone number.

### Internationalization
- English and Arabic language support.
- Right-to-left (RTL) layout for Arabic.
- Language preference detection and persistence.

### Data & Backend
- Supabase PostgreSQL database integration.
- Dynamic menu and category data.
- Order creation and order-item management.
- Server-side order validation and price calculation through PostgreSQL functions.
- Automatic order-status updates reflected in the tracking page.
- Row Level Security (RLS) and controlled database access.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI development |
| TypeScript | Type safety |
| React Router | Client-side routing |
| Tailwind CSS 4 | Styling and responsive layouts |
| TanStack Query | Server-state management |
| Zustand | Shopping cart state management |
| Supabase | PostgreSQL database and backend |
| i18next | English and Arabic translations |
| Lucide React | Icons |
| Vite | Development and build tooling |
| Vercel | Deployment |

## Architecture & Implementation

The application separates UI components, hooks, services, and state management to keep the code organized and maintainable.

- **TanStack Query:** Handles server data fetching, caching, and order tracking updates.
- **Zustand:** Manages shared cart state across the application.
- **Supabase RPC:** Handles sensitive database operations, including order creation and verified guest order tracking.
- **i18next:** Manages translations and language direction.
- **React Router:** Handles application navigation and route-based pages.

## Getting Started

### Prerequisites

- Node.js
- npm
- A Supabase project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/walaaosamamoh/oliva-table.git
   ```

2. Navigate to the project directory:

   ```bash
   cd oliva-table
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## Future Improvements

- Restaurant administration dashboard.
- Online payment integration.
- More advanced order management features.

## Author

**Walaa Osama**

---

*Built with care using React, TypeScript, and Supabase.*