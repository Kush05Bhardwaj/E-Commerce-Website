# 🛍️ E-Commerce Platform# 🛍️ MERN E-Commerce Platform



Modern full-stack e-commerce application built with **Next.js 15**, **TypeScript**, **MongoDB**, and **Tailwind CSS**.A modern, full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring OAuth authentication, real-time updates, and beautiful animations.



## 🚀 Quick Start![License](https://img.shields.io/badge/license-MIT-blue.svg)

![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

```bash![React](https://img.shields.io/badge/react-19.2.0-blue.svg)

# Navigate to the app

cd next-app## ✨ Features



# Install dependencies### 🔐 Authentication & Security

npm install- **JWT Authentication** with access & refresh tokens

- **Google OAuth 2.0** integration

# Set up environment variables- **Role-based access control** (user, admin, seller)

# Copy .env.local and update with your values- HTTP-only cookies for secure token storage

- Password hashing with bcrypt

# Run development server- Email verification support

npm run dev- Password reset functionality

```- Rate limiting & CORS protection

- XSS & MongoDB injection protection

Visit [http://localhost:3000](http://localhost:3000)

### 🛒 E-Commerce Features

## ✨ Features- Product catalog with categories

- Shopping cart with persistent state

- 🔐 **JWT Authentication** - Secure user registration and login- Wishlist functionality

- 🛒 **Shopping Cart** - Redux-powered cart management- Order management system

- 🎨 **Dark Mode** - Theme switching with persistence- Payment gateway integration (Stripe, Razorpay)

- 📱 **Responsive Design** - Mobile-first approach- Coupon & discount system

- ⚡ **Server-Side Rendering** - Better SEO and performance- Product reviews & ratings

- 🔄 **API Routes** - Built-in backend with Next.js- Inventory management

- 💳 **Product Catalog** - Browse and filter products- Multi-variant products (size, color, etc.)

- 🎭 **Smooth Animations** - Framer Motion effects

### 🎨 UI/UX

## 🛠️ Tech Stack- **Beautiful animations** with Framer Motion

- **Smooth scroll effects** and transitions

### Frontend- **Hover animations** on buttons and cards

- **Next.js 15** - React framework with App Router- Dark/Light theme support

- **React 19** - UI library- Responsive design (mobile, tablet, desktop)

- **TypeScript** - Type safety- Modern, clean interface

- **Tailwind CSS** - Utility-first styling- Loading states & skeletons

- **Framer Motion** - Animations- Toast notifications

- **Redux Toolkit** - State management

### 🏗️ Architecture

### Backend- **Monorepo structure** with workspaces

- **Next.js API Routes** - RESTful API- **TypeScript** throughout the stack

- **MongoDB** - NoSQL database- **Modular backend** (feature-based organization)

- **Mongoose** - ODM for MongoDB- **Redux Toolkit** for state management

- **JWT** - Authentication tokens- **React Query** for server state

- **bcryptjs** - Password hashing- **Zod** for validation

- **Zod** - Schema validation- **ESLint & Prettier** for code quality



## 📁 Project Structure## 🚀 Tech Stack



```### Frontend

next-app/- **React 19** - UI library

├── src/- **TypeScript** - Type safety

│   ├── app/                    # Next.js App Router- **Redux Toolkit** - State management

│   │   ├── api/                # Backend API routes- **React Router** - Navigation

│   │   ├── page.tsx            # Homepage- **Tailwind CSS** - Styling

│   │   └── layout.tsx          # Root layout- **Framer Motion** - Animations

│   ├── components/             # React components- **React Query** - Server state

│   ├── features/               # Redux slices- **React Hook Form** - Form handling

│   ├── lib/                    # Backend utilities- **Zod** - Schema validation

│   ├── models/                 # Mongoose models- **Axios** - HTTP client

│   └── store/                  # Redux store- **Vite** - Build tool

├── public/                     # Static assets

└── .env.local                  # Environment variables### Backend

```- **Node.js** - Runtime

- **Express.js** - Web framework

## 🔧 Environment Variables- **TypeScript** - Type safety

- **MongoDB** - Database

Create `.env.local` in the `next-app` directory:- **Mongoose** - ODM

- **Passport.js** - Authentication

```env- **JWT** - Token-based auth

MONGODB_URI=your-mongodb-connection-string- **bcrypt** - Password hashing

JWT_ACCESS_SECRET=your-secret-min-32-chars- **Cloudinary** - Image uploads

JWT_REFRESH_SECRET=your-secret-min-32-chars- **Stripe/Razorpay** - Payments

NEXTAUTH_URL=http://localhost:3000- **Socket.io** - Real-time updates

NEXTAUTH_SECRET=your-nextauth-secret- **BullMQ** - Job queues

```- **Pino** - Logging



## 📝 Available Scripts### DevOps & Tools

- **NPM Workspaces** - Monorepo management

```bash- **Concurrently** - Run multiple dev servers

npm run dev          # Start dev server- **ESLint** - Linting

npm run build        # Build for production- **Prettier** - Code formatting

npm start            # Start production server- **ts-node-dev** - Development server

npm run lint         # Run ESLint

```## 📦 Project Structure



## 🔌 API Endpoints```

ecommerce/

- `POST /api/auth/register` - Register new user├── apps/

- `POST /api/auth/login` - Login user│   ├── api/                    # Backend API

- `GET /api/auth/me` - Get current user│   │   ├── src/

- `POST /api/auth/logout` - Logout user│   │   │   ├── config/        # Configuration files

- `GET /api/health` - Health check│   │   │   │   ├── database.ts

│   │   │   │   ├── env.ts

## 🚀 Deployment│   │   │   │   └── passport.ts

│   │   │   ├── middleware/    # Express middleware

### Vercel (Recommended)│   │   │   ├── modules/       # Feature modules

```bash│   │   │   │   ├── auth/      # Authentication

npm i -g vercel│   │   │   │   ├── users/     # User management

cd next-app│   │   │   │   ├── products/  # Products (planned)

vercel│   │   │   │   ├── orders/    # Orders (planned)

```│   │   │   │   └── ...

│   │   │   ├── utils/         # Utility functions

---│   │   │   ├── app.ts         # Express app setup

│   │   │   └── server.ts      # Server entry point

**Built with ❤️ using Next.js 15**│   │   ├── .env               # Environment variables

│   │   ├── package.json

For detailed documentation, see `next-app/README.md`│   │   └── tsconfig.json

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
