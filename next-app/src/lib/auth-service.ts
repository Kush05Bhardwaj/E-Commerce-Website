import jwt from 'jsonwebtoken';
import User, { IUser } from '@/models/User';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export class AuthService {
  // Generate access token
  generateAccessToken(user: IUser): string {
    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return jwt.sign(payload, JWT_ACCESS_SECRET as any, {
      expiresIn: JWT_ACCESS_EXPIRES_IN,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  }

  // Generate refresh token
  generateRefreshToken(user: IUser): string {
    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return jwt.sign(payload, JWT_REFRESH_SECRET as any, {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  }

  // Verify access token
  verifyAccessToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_ACCESS_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  // Verify refresh token
  verifyRefreshToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  // Register new user with email/password
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User({
      name,
      email,
      password,
      authProvider: 'local',
      emailVerified: false,
    });

    await user.save();
    return user;
  }

  // Login with email/password
  async login(email: string, password: string): Promise<IUser> {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.authProvider !== 'local') {
      throw new Error(
        `Please login with ${user.authProvider.toUpperCase()}`
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    user.lastLogin = new Date();
    await user.save();

    return user;
  }

  // Find or create user from OAuth profile
  async findOrCreateOAuthUser(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile: any,
    provider: 'google' | 'facebook'
  ): Promise<IUser> {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error('Email not provided by OAuth provider');
    }

    // Check if user exists with this email
    let user = await User.findOne({ email });

    if (user) {
      // Update OAuth ID if not set
      if (provider === 'google' && !user.googleId) {
        user.googleId = profile.id;
      } else if (provider === 'facebook' && !user.facebookId) {
        user.facebookId = profile.id;
      }

      // Update auth provider if it was local
      if (user.authProvider === 'local') {
        user.authProvider = provider;
      }

      user.emailVerified = true; // OAuth emails are verified
      user.lastLogin = new Date();
      await user.save();
      return user;
    }

    // Create new user
    user = new User({
      name: profile.displayName || profile.name?.givenName || 'User',
      email,
      authProvider: provider,
      googleId: provider === 'google' ? profile.id : undefined,
      facebookId: provider === 'facebook' ? profile.id : undefined,
      avatar: profile.photos?.[0]?.value,
      emailVerified: true,
      lastLogin: new Date(),
    });

    await user.save();
    return user;
  }

  // Save refresh token
  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      $push: { refreshTokens: refreshToken },
    });
  }

  // Remove refresh token
  async removeRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      $pull: { refreshTokens: refreshToken },
    });
  }

  // Logout all sessions
  async logoutAllSessions(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      $set: { refreshTokens: [] },
    });
  }

  // Get user by ID
  async getUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }
}

export const authService = new AuthService();
