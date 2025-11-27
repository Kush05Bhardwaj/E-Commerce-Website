import { env } from "@config/env";
import { User, type IUser } from "@modules/users/user.model";
import { sign, verify } from "jsonwebtoken";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class AuthService {
  // Generate access token
  generateAccessToken(user: IUser): string {
    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    return sign(payload, env.jwt.accessSecret, {
      expiresIn: env.jwt.accessExpiresIn,
    });
  }

  // Generate refresh token
  generateRefreshToken(user: IUser): string {
    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    return sign(payload, env.jwt.refreshSecret, {
      expiresIn: env.jwt.refreshExpiresIn,
    });
  }

  // Verify access token
  verifyAccessToken(token: string): TokenPayload {
    return verify(token, env.jwt.accessSecret) as TokenPayload;
  }

  // Verify refresh token
  verifyRefreshToken(token: string): TokenPayload {
    return verify(token, env.jwt.refreshSecret) as TokenPayload;
  }

  // Register new user with email/password
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User({
      name,
      email,
      password,
      authProvider: "local",
      emailVerified: false,
    });

    await user.save();
    return user;
  }

  // Login with email/password
  async login(email: string, password: string): Promise<IUser> {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (user.authProvider !== "local") {
      throw new Error(
        `Please login with ${user.authProvider.toUpperCase()}`
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    user.lastLogin = new Date();
    await user.save();

    return user;
  }

  // Find or create user from OAuth profile
  async findOrCreateOAuthUser(
    profile: any,
    provider: "google" | "facebook"
  ): Promise<IUser> {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error("Email not provided by OAuth provider");
    }

    // Check if user exists with this email
    let user = await User.findOne({ email });

    if (user) {
      // Update OAuth ID if not set
      if (provider === "google" && !user.googleId) {
        user.googleId = profile.id;
      } else if (provider === "facebook" && !user.facebookId) {
        user.facebookId = profile.id;
      }

      // Update auth provider if it was local
      if (user.authProvider === "local") {
        user.authProvider = provider;
      }

      user.emailVerified = true; // OAuth emails are verified
      user.lastLogin = new Date();
      await user.save();
      return user;
    }

    // Create new user
    user = new User({
      name: profile.displayName || profile.name?.givenName || "User",
      email,
      authProvider: provider,
      googleId: provider === "google" ? profile.id : undefined,
      facebookId: provider === "facebook" ? profile.id : undefined,
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
}

export const authService = new AuthService();
