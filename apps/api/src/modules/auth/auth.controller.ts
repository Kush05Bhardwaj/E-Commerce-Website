import { authService } from "@modules/auth/auth.service";
import type { Request, Response, NextFunction } from "express";

export class AuthController {
  // Register
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await authService.register(name, email, password);

      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);

      await authService.saveRefreshToken(user._id.toString(), refreshToken);

      // Set refresh token in HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(201).json({
        message: "Registration successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          emailVerified: user.emailVerified,
        },
        accessToken,
      });
    } catch (error: any) {
      next(error);
    }
  }

  // Login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await authService.login(email, password);

      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);

      await authService.saveRefreshToken(user._id.toString(), refreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          emailVerified: user.emailVerified,
        },
        accessToken,
      });
    } catch (error: any) {
      next(error);
    }
  }

  // Logout
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const userId = req.user?.userId;

      if (refreshToken && userId) {
        await authService.removeRefreshToken(userId, refreshToken);
      }

      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout successful" });
    } catch (error: any) {
      next(error);
    }
  }

  // Refresh token
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token not found" });
      }

      const payload = authService.verifyRefreshToken(refreshToken);
      const user = await authService.findOrCreateOAuthUser(
        { id: payload.userId, emails: [{ value: payload.email }] },
        "google"
      );

      const newAccessToken = authService.generateAccessToken(user);
      const newRefreshToken = authService.generateRefreshToken(user);

      await authService.removeRefreshToken(payload.userId, refreshToken);
      await authService.saveRefreshToken(payload.userId, newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ accessToken: newAccessToken });
    } catch (error: any) {
      next(error);
    }
  }

  // Get current user
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await authService.findOrCreateOAuthUser(
        { id: userId },
        "google"
      );

      res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          emailVerified: user.emailVerified,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export const authController = new AuthController();
