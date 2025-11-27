# ⚡ Quick Start Guide

Get your MERN E-Commerce platform up and running in 5 minutes!

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** (local or MongoDB Atlas account)

## 🚀 Setup Steps

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd ecommerce

# Install all dependencies
npm install
```

### 2. Configure MongoDB

**Option A: MongoDB Atlas (Recommended)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Whitelist your IP address

**Option B: Local MongoDB**
```bash
# Install MongoDB locally
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: Follow official docs

# Start MongoDB
mongod
```

### 3. Set Up Environment Variables

```bash
# Copy the example file
cp apps/api/env.example apps/api/.env

# Edit apps/api/.env
```

**Minimal configuration to get started:**

```env
NODE_ENV=development
PORT=5000

# Your MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# Generate random strings for these (use any random string generator)
JWT_ACCESS_SECRET=your_random_secret_key_here_make_it_long
JWT_REFRESH_SECRET=another_different_random_secret_key_here

# Default values (can use as-is)
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
CLIENT_URL=http://localhost:5173

# Optional: Set these later for OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 4. Start Development Servers

```bash
# Start both frontend and backend
npm run dev
```

That's it! 🎉

Your application will be running at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## ✅ Verify Installation

### Check Backend
Visit http://localhost:5000/api/health

You should see:
```json
{
  "status": "ok",
  "uptime": 12.34,
  "timestamp": "2025-11-27T..."
}
```

### Check Frontend
Visit http://localhost:5173

You should see the beautiful landing page with animations!

## 🔑 Test Authentication

### Register a New User

1. Go to http://localhost:5173/auth/register
2. Fill in the form:
   - Name: Your Name
   - Email: test@example.com
   - Password: TestPass123
3. Click "Sign up"
4. You'll be logged in automatically!

### Test Login

1. Go to http://localhost:5173/auth/login
2. Enter your credentials
3. Click "Sign in"

## 🎨 Explore Features

- ✅ Browse products on the home page
- ✅ Add items to cart
- ✅ View cart at http://localhost:5173/cart
- ✅ Check your profile at http://localhost:5173/profile
- ✅ Access admin dashboard at http://localhost:5173/dashboard

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error**: `MongoDB connection error`

**Solution**:
1. Check your `MONGODB_URI` in `.env`
2. Make sure MongoDB is running (if local)
3. Verify IP is whitelisted (if Atlas)
4. Check username/password are correct

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**:
```bash
# Change PORT in apps/api/.env
PORT=5001
```

### Module Not Found

**Error**: `Cannot find module...`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules
rm package-lock.json
npm install
```

### React/Vite Build Issues

**Solution**:
```bash
cd apps/web
rm -rf node_modules dist
npm install
npm run dev
```

## 🔐 Optional: Set Up Google OAuth

Want to enable "Continue with Google"? Follow these steps:

### 1. Get Google Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Select **Web application**
6. Add authorized redirect URI:
   ```
   http://localhost:5000/api/auth/google/callback
   ```
7. Copy **Client ID** and **Client Secret**

### 2. Update .env

```env
GOOGLE_CLIENT_ID=your_actual_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### 3. Restart Servers

```bash
# Stop the current process (Ctrl+C)
# Start again
npm run dev
```

### 4. Test OAuth

1. Go to http://localhost:5173/auth/login
2. Click "Continue with Google"
3. Sign in with your Google account
4. You'll be redirected back logged in! ✨

## 📚 Next Steps

Now that you're up and running:

1. **Read the Documentation**
   - [Main README](./README.md)
   - [API Documentation](./apps/api/README.md)
   - [Frontend Documentation](./apps/web/README.md)
   - [OAuth Setup Guide](./docs/oauth-setup.md)

2. **Explore the Code**
   - Check out the modular backend structure
   - See the beautiful animations in action
   - Customize the Tailwind theme
   - Add new features

3. **Build Your Features**
   - Add product listings
   - Implement checkout flow
   - Build admin dashboard
   - Integrate payment gateways

## 💡 Useful Commands

```bash
# Run only backend
npm run dev:api

# Run only frontend
npm run dev:web

# Build for production
npm run build

# Run production API server
cd apps/api
npm start

# Lint code
npm run lint

# Format API code
cd apps/api
npm run format
```

## 🆘 Need Help?

- Check the [Troubleshooting](#-troubleshooting) section above
- Read the [full documentation](./README.md)
- Open an issue in the repository

## 🎉 You're Ready!

Congratulations! You have a fully functional MERN stack e-commerce platform with:
- ✅ JWT Authentication
- ✅ MongoDB Database
- ✅ React Frontend with animations
- ✅ Express API
- ✅ TypeScript throughout
- ✅ Redux state management
- ✅ Beautiful UI with Tailwind

Happy coding! 🚀

---

**Questions?** Check the main [README](./README.md) or the [documentation](./docs/)
