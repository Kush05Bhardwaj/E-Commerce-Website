# 🛍️ Next.js E-Commerce Platform

Full-stack e-commerce application built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
# Update .env.local with your configuration

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## ✨ Features

- 🔐 JWT Authentication (register, login, refresh tokens)
- 🛒 Shopping Cart with Redux
- 🎨 Dark/Light Theme
- 📱 Fully Responsive
- ⚡ Server-Side Rendering
- 🎭 Smooth Animations (Framer Motion)
- 🔌 RESTful API Routes
- 💾 MongoDB Database

## 🛠️ Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **JWT** - Authentication
- **Zod** - Validation

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # Backend API routes
│   │   ├── auth/         # Auth endpoints
│   │   └── health/       # Health check
│   ├── page.tsx          # Homepage
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── layout/           # Layout components
│   ├── cards/            # Card components
│   ├── ui/               # UI components
│   └── theme/            # Theme provider
├── features/             # Redux slices
│   ├── auth/             # Auth state
│   ├── cart/             # Cart state
│   └── ui/               # UI state
├── lib/                  # Utilities
│   ├── mongodb.ts        # DB connection
│   └── auth-service.ts   # Auth logic
├── models/               # Mongoose models
├── store/                # Redux store
├── hooks/                # Custom hooks
└── utils/                # Helper functions
```

## 🔧 Environment Variables

Update `.env.local`:

```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

# JWT
JWT_ACCESS_SECRET=your-secret-min-32-chars
JWT_REFRESH_SECRET=your-secret-min-32-chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Production server
npm run lint         # Lint code
npm run type-check   # TypeScript check
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    # Register user
POST   /api/auth/login       # Login user
GET    /api/auth/me          # Get current user (requires auth)
POST   /api/auth/logout      # Logout user
POST   /api/auth/refresh     # Refresh access token
```

### Health
```
GET    /api/health           # API health check
```

## 📖 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🎨 Component Patterns

### Server Component (default)
```tsx
// src/app/products/page.tsx
export default async function ProductsPage() {
  const products = await fetch('/api/products').then(r => r.json());
  return <div>{/* Render products */}</div>;
}
```

### Client Component
```tsx
// src/components/Counter.tsx
'use client';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### API Route
```tsx
// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}
```

## 🔐 Authentication Flow

1. **Register/Login** → Receive `accessToken` + HTTP-only `refreshToken` cookie
2. **Store Token** → Save `accessToken` in Redux
3. **API Requests** → Include `Authorization: Bearer <token>` header
4. **Token Expired** → Call `/api/auth/refresh` to get new token
5. **Logout** → Call `/api/auth/logout` to invalidate tokens

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production
Make sure to set these in your deployment platform:
- `MONGODB_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

## 🎯 Adding New Features

### New Page
```tsx
// src/app/shop/page.tsx
export default function ShopPage() {
  return <div>Shop Page</div>;
}
// Auto-routes to /shop
```

### New API Route
```tsx
// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ products: [] });
}
// Auto-routes to /api/products
```

### New Redux Slice
```tsx
// src/features/products/productsSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [] },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
});
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npx kill-port 3000
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Issues
- Check `MONGODB_URI` in `.env.local`
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://docs.mongodb.com/)

---

**Built with ❤️ using Next.js 15 and TypeScript**
