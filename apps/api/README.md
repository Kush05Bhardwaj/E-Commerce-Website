# 🔧 API - Backend Service

Express.js backend API for the MERN E-Commerce platform with JWT authentication, OAuth, and modular architecture.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication middleware
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **Zod** - Schema validation

## 📁 Project Structure

```
apps/api/
├── src/
│   ├── config/              # Configuration
│   │   ├── database.ts      # MongoDB connection
│   │   ├── env.ts           # Environment variables
│   │   └── passport.ts      # Passport strategies
│   ├── middleware/          # Express middleware
│   │   └── errorHandler.ts # Error handling
│   ├── modules/             # Feature modules
│   │   ├── auth/           # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.middleware.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.service.ts
│   │   ├── health/         # Health check
│   │   │   └── health.route.ts
│   │   └── users/          # User management
│   │       └── user.model.ts
│   ├── types/              # TypeScript declarations
│   │   └── custom.d.ts
│   ├── utils/              # Utilities
│   │   └── logger.ts       # Pino logger
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server entry point
├── .env                     # Environment variables
├── .env.example            # Environment template
├── package.json
└── tsconfig.json
```

## 🔧 Setup

### Install Dependencies

```bash
cd apps/api
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT
JWT_ACCESS_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Security
BCRYPT_SALT_ROUNDS=12

# Frontend
CLIENT_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Optional Services
RESEND_API_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
STRIPE_SECRET_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_URL=redis://localhost:6379
```

## 🏃 Running

### Development

```bash
npm run dev
```

Server runs on http://localhost:5000

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## 📡 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "emailVerified": false
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <access_token>
```

#### Refresh Token
```http
POST /api/auth/refresh
Cookie: refreshToken=<refresh_token>
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <access_token>
Cookie: refreshToken=<refresh_token>
```

#### Google OAuth
```http
GET /api/auth/google
```
Redirects to Google OAuth consent screen.

```http
GET /api/auth/google/callback?code=...
```
Google redirects here after user approval.

### Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "uptime": 12345.67,
  "timestamp": "2025-11-27T16:30:00.000Z"
}
```

## 🔐 Authentication Flow

### JWT Authentication

1. User logs in or registers
2. Server generates:
   - **Access token** (15min) - stored in client memory/localStorage
   - **Refresh token** (7 days) - stored in HTTP-only cookie
3. Client includes access token in Authorization header
4. When access token expires, use refresh token to get new one

### OAuth Flow

1. User clicks "Continue with Google"
2. Frontend redirects to `/api/auth/google`
3. Server redirects to Google OAuth
4. User approves access
5. Google redirects to `/api/auth/google/callback`
6. Server creates/finds user and generates tokens
7. Server redirects to frontend with access token
8. Frontend stores token and fetches user data

## 🔒 Security Features

- **Password hashing** with bcrypt (12 rounds)
- **JWT tokens** with secure secrets
- **HTTP-only cookies** for refresh tokens
- **CORS** protection
- **Rate limiting** (200 requests per 15 minutes)
- **Helmet** security headers
- **XSS** protection with xss-clean
- **MongoDB injection** protection
- **Input validation** with Zod
- **Session management**

## 📊 Database Models

### User Model

```typescript
{
  name: string;
  email: string;          // unique, lowercase
  password?: string;      // hashed, optional for OAuth
  role: "user" | "admin" | "seller";
  avatar?: string;
  emailVerified: boolean;
  authProvider: "local" | "google" | "facebook";
  googleId?: string;
  facebookId?: string;
  refreshTokens: string[];
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🛠️ Development

### Code Quality

```bash
# Lint
npm run lint

# Format
npm run format
```

### TypeScript Path Aliases

- `@config/*` → `src/config/*`
- `@middleware/*` → `src/middleware/*`
- `@modules/*` → `src/modules/*`
- `@utils/*` → `src/utils/*`

### Adding a New Module

1. Create folder in `src/modules/`
2. Add model, service, controller, routes
3. Register routes in `src/app.ts`

Example:
```typescript
// src/modules/products/product.route.ts
import { Router } from "express";
export const productRouter = Router();
// ... define routes

// src/app.ts
import { productRouter } from "@modules/products/product.route";
app.use("/api/products", productRouter);
```

## 🐛 Debugging

### Enable Debug Logs

```env
LOG_LEVEL=debug
```

### View Logs

Logs use Pino with pretty formatting. Check console for:
- Request logs (Morgan)
- Application logs (Pino)
- Error logs

## 🚀 Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Use production MongoDB URI
3. Set secure JWT secrets
4. Configure OAuth callback URLs
5. Enable HTTPS
6. Set appropriate CORS origins

### Build & Deploy

```bash
npm run build
npm start
```

### Recommended Platforms

- **Railway** - Easy deployment with MongoDB
- **Render** - Free tier available
- **Heroku** - Classic PaaS
- **DigitalOcean App Platform**
- **AWS EC2** - Full control

## 📝 Notes

- Refresh tokens are stored in database for multi-session management
- OAuth users don't have passwords (password field is optional)
- Email verification ready but not yet implemented
- Password reset flow ready but not yet implemented

## 🤝 Contributing

When adding features:
1. Follow the modular structure
2. Add TypeScript types
3. Include error handling
4. Update API documentation
5. Write tests (when test suite is added)

---

**Part of the MERN E-Commerce Platform**
