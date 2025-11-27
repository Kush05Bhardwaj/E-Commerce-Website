# OAuth Setup Guide

## Google OAuth Configuration

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Configure the consent screen if prompted
6. Select **Web application** as the application type
7. Add authorized JavaScript origins:
   - `http://localhost:5173` (frontend)
   - `http://localhost:5000` (backend)
8. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
9. Click **Create**
10. Copy the **Client ID** and **Client Secret**

### 2. Update Environment Variables

Add the following to `apps/api/.env`:

```env
GOOGLE_CLIENT_ID=your_actual_google_client_id
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### 3. Testing OAuth Flow

1. Start both servers:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:5173/auth/login

3. Click "Continue with Google"

4. Complete the Google OAuth flow

5. You'll be redirected back to the application with authentication

## OAuth Flow

### Backend Flow:
1. User clicks "Continue with Google" → redirects to `/api/auth/google`
2. Passport redirects user to Google's OAuth consent screen
3. User approves access
4. Google redirects to `/api/auth/google/callback` with auth code
5. Backend exchanges code for user profile
6. Backend creates or finds user in database
7. Backend generates JWT tokens
8. Backend redirects to frontend with access token in URL

### Frontend Flow:
1. User is redirected to `/auth/callback?token=...`
2. Frontend extracts token from URL
3. Frontend stores token in localStorage
4. Frontend fetches user data with token
5. Frontend redirects to home page

## API Endpoints

### Authentication Endpoints:

- `POST /api/auth/register` - Register with email/password
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout (requires authentication)
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (requires authentication)
- `GET /api/auth/google` - Initiate Google OAuth flow
- `GET /api/auth/google/callback` - Google OAuth callback

### Request/Response Examples:

**Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "message": "Registration successful",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "emailVerified": false
  },
  "accessToken": "eyJhbGc..."
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response: Same as register
```

## Security Features

- ✅ JWT-based authentication (access + refresh tokens)
- ✅ HTTP-only cookies for refresh tokens
- ✅ Password hashing with bcrypt
- ✅ OAuth 2.0 with Google
- ✅ Role-based access control (user, admin, seller)
- ✅ Email verification support (ready for implementation)
- ✅ Session management
- ✅ CORS protection
- ✅ Rate limiting
- ✅ XSS and MongoDB injection protection

## User Model Fields

- `name` - User's full name
- `email` - User's email (unique)
- `password` - Hashed password (optional for OAuth users)
- `role` - User role (user, admin, seller)
- `avatar` - Profile picture URL
- `emailVerified` - Email verification status
- `authProvider` - Authentication provider (local, google, facebook)
- `googleId` - Google OAuth ID (optional)
- `refreshTokens` - Array of active refresh tokens
- `isActive` - Account status
- `lastLogin` - Last login timestamp

## Next Steps

1. Set up Google OAuth credentials
2. Update `.env` with real credentials
3. Test OAuth flow
4. Implement email verification
5. Add password reset functionality
6. Add more OAuth providers (Facebook, GitHub, etc.)
