## MERN Commerce Platform – Architecture Blueprint

### 1. High-Level Overview
- **Frontend**: React + Redux Toolkit + React Router DOM, TailwindCSS, Axios, PWA enhancements, dark/light theme context.
- **Backend**: Node.js + Express.js REST API, modular feature-based routes/controllers/services, JWT auth, background jobs via BullMQ (Redis) for emails/notifications.
- **Database**: MongoDB Atlas with Mongoose ODM, using collections for users, products, categories, orders, carts, wishlists, coupons, reviews, addresses, banners, activity logs.
- **Infra & DevOps**: Monorepo structure with `apps/web` and `apps/api`, shared TypeScript types in `packages/shared`. Deployed via Vercel (frontend) and Render/Railway (backend). CI via GitHub Actions running lint/test/build.

### 2. Folder Structure
```
/apps
  /api
    src/
      config/
      middleware/
      modules/
        auth/
        users/
        products/
        orders/
        payments/
        reviews/
        coupons/
        categories/
        banners/
        inventory/
      utils/
      server.ts
  /web
    src/
      api/
      app/
      components/
      features/
        auth/
        cart/
        catalog/
        checkout/
        dashboard/
      hooks/
      pages/
      routes/
      store/
      styles/
/packages
  /shared
    types/
    utils/
/docs
/scripts
```

### 3. Data Models (Mongoose)
- **User**: profile info, auth credentials, roles (`user`, `admin`, `seller`), emailVerification + passwordReset tokens, auth providers, addresses, wishlist refs, activity log.
- **Product**: title, slug, description, pricing, discount, inventory, variants (attributes array), media (Cloudinary IDs), rating summary, tags, categories & subcategories, analytics counters.
- **Category**: hierarchical tree, slug, banner references.
- **Order**: user ref, cart snapshot, payment info, shipping address, status timeline, tracking data, invoice pointer, cancellation/return requests.
- **Cart**: user ref, items (product + variant + qty), applied coupon, totals cache.
- **Wishlist**: user ref, product refs.
- **Coupon**: code, type, discount value, min order, usage limits, validity range, usage tracking.
- **Review**: user ref, product ref, rating, text, media, verifiedPurchase flag, moderation status.
- **Banner**: hero, offers, featured categories with scheduling.
- **ActivityLog**: actor, action, metadata for auditing admin actions.

### 4. Auth & Security
- **JWT**: short-lived access token + refresh token, HTTP-only cookies, rotation strategy.
- **Password hashing**: bcrypt with pepper from env.
- **Email verification**: signed token via Nodemailer/Resend, stored with TTL.
- **Forgot password**: OTP (Redis) or signed link.
- **Role-based access**: middleware verifying `req.user.role` and optional `permissions`.
- **Additional hardening**: Helmet, cors whitelist, express-rate-limit, mongo-sanitize, xss-clean, strict CSP, logging via pino + morgan.

### 5. Key Backend Modules
- **Auth module**: signup/login/logout/refresh, OAuth (Google), email verification, password reset.
- **Catalog module**: products, categories, filters/search (Mongo text + indexes), recommendations (rule-based + trending).
- **Cart/Checkout module**: sync cart API, coupon validation, shipping estimator service.
- **Order module**: order lifecycle, status transitions, invoice PDF generation, webhook handling for payment providers.
- **Payment module**: Stripe/Razorpay intents, signature validation, refund endpoints.
- **Admin module**: metrics aggregation (Mongo aggregation pipelines), user management, bulk CSV import/export, banner management.
- **Notification module**: global toasts via websocket (Socket.IO) + email queue.

### 6. Frontend Application Flow
- **State management**: Redux Toolkit slices per feature, RTK Query for API caching, persisted state for auth/cart.
- **Routing**: Public, protected (user), and admin routes using role guard HOCs.
- **UI/UX**: Tailwind utility classes + Headless UI components, skeletons, toasts, responsive grid. Dark/light theme via CSS variables.
- **PWA**: manifest + service worker for offline catalog & cached assets.
- **Integrations**: Cloudinary upload widget for product images, Stripe checkout, Razorpay fallback.

### 7. Recommendations & Personalization
- Hybrid approach: track user activity (views, purchases) -> store in `userInsights` collection. Provide similar products (shared categories/tags) plus popular items. Optional ML microservice hook.

### 8. Deployment & DevOps
- **Environment variables** managed through `.env` templates and secret managers.
- **CI pipeline**: lint (ESLint + Prettier), test (Jest + React Testing Library + supertest), build, deploy to staging.
- **Monitoring**: Integrate Logtail/Sentry for logs + errors, Cron jobs for inventory alerts.

### 9. Milestones
1. Core scaffolding, auth, user CRUD.
2. Product/catalog API + frontend listings.
3. Cart + checkout + payment integration.
4. Orders, reviews, profile.
5. Admin dashboard features.
6. Enhancements (PWA, recommendations, activity logs, etc.), deployment and docs.

This document guides the build phase; adjust as requirements evolve.

