import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`),
});

const required = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  mongoUri: required(process.env.MONGODB_URI, "MONGODB_URI"),
  jwt: {
    accessSecret: required(process.env.JWT_ACCESS_SECRET, "JWT_ACCESS_SECRET"),
    refreshSecret: required(process.env.JWT_REFRESH_SECRET, "JWT_REFRESH_SECRET"),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 12),
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback",
    },
  },
  resendApiKey: process.env.RESEND_API_KEY,
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  redisUrl: process.env.REDIS_URL,
};

