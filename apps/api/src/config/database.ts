import { logger } from "@utils/logger";
import mongoose from "mongoose";

import { env } from "./env";

export const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.mongoUri);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error({ error }, "MongoDB connection error");
    process.exit(1);
  }
};

