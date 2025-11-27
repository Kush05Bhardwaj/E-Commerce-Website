import { env } from "@config/env";
import { authService } from "@modules/auth/auth.service";
import type { IUser } from "@modules/users/user.model";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const User = (await import("@modules/users/user.model")).User;
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Google OAuth Strategy
if (env.oauth.google.clientId && env.oauth.google.clientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.oauth.google.clientId,
        clientSecret: env.oauth.google.clientSecret,
        callbackURL: env.oauth.google.callbackUrl,
        scope: ["profile", "email"],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const user = await authService.findOrCreateOAuthUser(
            profile,
            "google"
          );
          done(null, user);
        } catch (error) {
          done(error as Error);
        }
      }
    )
  );
}

export { passport };
