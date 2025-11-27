# 🛍️ MERN E-Commerce Platform

A modern, full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring OAuth authentication, real-time updates, and beautiful animations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.2.0-blue.svg)

## ✨ Features

### 🔐 Authentication & Security
- **JWT Authentication** with access & refresh tokens
- **Google OAuth 2.0** integration
- **Role-based access control** (user, admin, seller)
- HTTP-only cookies for secure token storage
- Password hashing with bcrypt
- Email verification support
- Password reset functionality
- Rate limiting & CORS protection
- XSS & MongoDB injection protection

### 🛒 E-Commerce Features
- Product catalog with categories
- Shopping cart with persistent state
- Wishlist functionality
- Order management system
- Payment gateway integration (Stripe, Razorpay)
- Coupon & discount system
- Product reviews & ratings
- Inventory management
- Multi-variant products (size, color, etc.)

### 🎨 UI/UX
- **Beautiful animations** with Framer Motion
- **Smooth scroll effects** and transitions
- **Hover animations** on buttons and cards
- Dark/Light theme support
- Responsive design (mobile, tablet, desktop)
- Modern, clean interface
- Loading states & skeletons
- Toast notifications

### 🏗️ Architecture
- **Monorepo structure** with workspaces
- **TypeScript** throughout the stack
- **Modular backend** (feature-based organization)
- **Redux Toolkit** for state management
- **React Query** for server state
- **Zod** for validation
- **ESLint & Prettier** for code quality

## 🚀 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Server state
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **Passport.js** - Authentication
- **JWT** - Token-based auth
- **bcrypt** - Password hashing
- **Cloudinary** - Image uploads
- **Stripe/Razorpay** - Payments
- **Socket.io** - Real-time updates
- **BullMQ** - Job queues
- **Pino** - Logging

### DevOps & Tools
- **NPM Workspaces** - Monorepo management
- **Concurrently** - Run multiple dev servers
- **ESLint** - Linting
- **Prettier** - Code formatting
- **ts-node-dev** - Development server

## 📦 Project Structure

```
ecommerce/
├── apps/
│   ├── api/                    # Backend API
│   │   ├── src/
│   │   │   ├── config/        # Configuration files
│   │   │   │   ├── database.ts
│   │   │   │   ├── env.ts
│   │   │   │   └── passport.ts
│   │   │   ├── middleware/    # Express middleware
│   │   │   ├── modules/       # Feature modules
│   │   │   │   ├── auth/      # Authentication
│   │   │   │   ├── users/     # User management
│   │   │   │   ├── products/  # Products (planned)
│   │   │   │   ├── orders/    # Orders (planned)
│   │   │   │   └── ...
│   │   │   ├── utils/         # Utility functions
│   │   │   ├── app.ts         # Express app setup
│   │   │   └── server.ts      # Server entry point
│   │   ├── .env               # Environment variables
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                   # Frontend React app
│       ├── src/
│       │   ├── api/           # API client
│       │   ├── app/           # App providers & theme
│       │   ├── assets/        # Static assets
│       │   ├── components/    # Reusable components
│       │   │   ├── animations/   # Animation components
│       │   │   ├── cards/        # Card components
│       │   │   ├── layout/       # Layout components
│       │   │   └── ui/           # UI components
│       │   ├── features/      # Redux slices
│       │   │   ├── auth/
│       │   │   ├── cart/
│       │   │   └── ui/
│       │   ├── hooks/         # Custom hooks
│       │   ├── pages/         # Page components
│       │   │   ├── auth/
│       │   │   ├── dashboard/
│       │   │   └── ...
│       │   ├── routes/        # Route configuration
│       │   ├── store/         # Redux store
│       │   ├── styles/        # Global styles
│       │   ├── utils/         # Utility functions
│       │   └── main.tsx       # Entry point
│       ├── index.html
│       ├── package.json
│       └── vite.config.ts
│
├── docs/                      # Documentation
│   ├── architecture.md
│   ├── oauth-setup.md
│   └── oauth-implementation-summary.md
│
├── package.json               # Root package.json
├── server.js                  # Node.js entry point
├── .gitignore
└── README.md
```

## 🏁 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** (local or Atlas)
- **Google OAuth Credentials** (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp apps/api/env.example apps/api/.env
   ```
   
   Update `apps/api/.env` with your values:
   ```env
   # MongoDB
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   
   # JWT Secrets (generate random strings)
   JWT_ACCESS_SECRET=your_super_secret_access_key
   JWT_REFRESH_SECRET=your_super_secret_refresh_key
   
   # Google OAuth (get from Google Cloud Console)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   
   # Frontend URL
   CLIENT_URL=http://localhost:5173
   ```

4. **Set up Google OAuth** (see [OAuth Setup Guide](./docs/oauth-setup.md))

### Running the Application

**Development mode** (runs both API and web):
```bash
npm run dev
```

**Run API only**:
```bash
npm run dev:api
```

**Run frontend only**:
```bash
npm run dev:web
```

**Run with Node.js directly**:
```bash
node server.js
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

### Building for Production

```bash
# Build both apps
npm run build

# Build API only
npm run build:api

# Build frontend only
npm run build:web

# Start production API server
cd apps/api
npm start
```

## 📖 Documentation

- **[Architecture Overview](./docs/architecture.md)** - System design and data models
- **[OAuth Setup Guide](./docs/oauth-setup.md)** - How to configure Google OAuth
- **[OAuth Implementation](./docs/oauth-implementation-summary.md)** - Technical details

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback

### Health Check
- `GET /api/health` - API health status

## 🎨 Key Features Walkthrough

### 1. Beautiful Animations
- Smooth scroll-triggered animations
- Hover effects on all interactive elements
- Page transitions with Framer Motion
- Staggered list animations
- Spring physics for natural movement

### 2. OAuth Integration
- One-click Google sign-in
- Automatic user creation
- Secure token management
- Seamless user experience

### 3. Shopping Experience
- Add to cart with animations
- Persistent cart state
- Real-time cart updates
- Smooth checkout flow

### 4. Admin Dashboard
- Sales analytics (planned)
- User management (planned)
- Product management (planned)
- Order tracking (planned)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run API tests
npm run test:api

# Run frontend tests
npm run test:web
```

## 📝 Code Quality

```bash
# Lint all code
npm run lint

# Lint API
npm run lint:api

# Lint frontend
npm run lint:web

# Format code (in API directory)
cd apps/api
npm run format
```

## 🚢 Deployment

### Backend (Railway, Render, or Heroku)
1. Set environment variables
2. Build: `npm run build:api`
3. Start: `npm start` (from apps/api)

### Frontend (Vercel or Netlify)
1. Set build command: `npm run build:web`
2. Set output directory: `apps/web/dist`
3. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using the MERN stack**
