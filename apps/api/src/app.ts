import { env } from "@config/env";
import { passport } from "@config/passport";
import { errorHandler, notFoundHandler } from "@middleware/errorHandler";
import { authRouter } from "@modules/auth/auth.route";
import { healthRouter } from "@modules/health/health.route";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import xss from "xss-clean";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: env.jwt.accessSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: env.nodeEnv === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };

