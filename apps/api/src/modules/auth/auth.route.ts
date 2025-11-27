import { authController } from "@modules/auth/auth.controller";
import { authenticate } from "@modules/auth/auth.middleware";
import { authService } from "@modules/auth/auth.service";
import type { IUser } from "@modules/users/user.model";
import { Router } from "express";
import { passport } from "@config/passport";

export const authRouter = Router();

// Local auth routes
authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/login", authController.login.bind(authController));
authRouter.post("/logout", authenticate, authController.logout.bind(authController));
authRouter.post("/refresh", authController.refreshToken.bind(authController));
authRouter.get("/me", authenticate, authController.getMe.bind(authController));

// Google OAuth routes
authRouter.get(
  "/google",
  passport.authenticate("google", { session: false })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/auth/login" }),
  async (req, res) => {
    try {
      const user = req.user as unknown as IUser;

      if (!user) {
        return res.redirect(`${process.env.CLIENT_URL}/auth/login?error=oauth_failed`);
      }

      // Generate tokens
      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);

      await authService.saveRefreshToken(user._id.toString(), refreshToken);

      // Set refresh token in cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Redirect to frontend with access token
      res.redirect(
        `${process.env.CLIENT_URL}/auth/callback?token=${accessToken}`
      );
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/auth/login?error=server_error`);
    }
  }
);
