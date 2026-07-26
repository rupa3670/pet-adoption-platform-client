#  Pawsome Adoption — Pet Adoption Platform

## Purpose

The goal of this project is to make pet adoption simple, transparent, and accessible by connecting people looking to adopt with pet owners and shelters, replacing informal/offline adoption processes with a secure, organized, and user-friendly online platform where users can browse pets, request adoption, and manage their requests.

## Live URL

[Add your live site link here]

## Features

-  **Advanced Pet Browsing** — Search pets by name and filter by species using MongoDB `$regex` and `$in` operators, right from the All Pets page.
-  **Secure Authentication** — Email/password login & registration with strong password validation, plus Google login, backed by JWT stored in HTTPOnly cookies and verified via middleware to protect private routes.
-  **Full Pet Management (CRUD)** — Pet owners can add, update, and delete their own pet listings, each with detailed profiles (breed, age, health & vaccination status, location, adoption fee, etc.).
-  **Adoption Request System** — Users can submit adoption requests with pickup date and message; owners can approve or reject requests, and once a request is approved the pet is automatically marked as adopted and locked from further requests.
-  **Personal Dashboard** — Dedicated dashboard views for "My Listings" (with live stats), "My Requests", and "Add Pet", so both adopters and owners can manage everything in one place.
-  **Clean, Responsive UI** — Fully responsive design across mobile, tablet, and desktop, styled with Tailwind CSS and HeroUI components, with toast-based notifications instead of default browser alerts.
-  **Dark / Light Theme Toggle** — Users can switch between dark and light modes across the entire site.
-  **Smooth Animations** — Framer Motion powers subtle, polished transitions and micro-interactions throughout the app.

## NPM Packages Used

### Client
- `next` — React framework for routing, SSR/CSR
- `react` / `react-dom`
- `react-toastify` — toast/UI-based notifications
- `@heroui/react` (HeroUI) — UI component library
- `tailwindcss` — utility-first styling
- `@gravity-ui/icons` / `gravity-ui` — icon set
- `framer-motion` — animations
- `axios` — API requests
- `firebase` — authentication (email/password & Google login)
- `react-hook-form` — form handling & validation
- `js-cookie` — cookie handling on the client

### Server
- `express` — server framework
- `mongodb` — database driver
- `jsonwebtoken` — JWT generation & verification
- `cookie-parser` — parsing HTTPOnly cookies
- `cors` — cross-origin resource sharing
- `dotenv` — environment variable management