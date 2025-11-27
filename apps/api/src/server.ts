import { connectDatabase } from "@config/database";
import { env } from "@config/env";
import { logger } from "@utils/logger";
import http from "http";

import { app } from "./app";

const start = async () => {
  await connectDatabase();
  const server = http.createServer(app);
  server.listen(env.port, () => {
    logger.info(`API listening on port ${env.port}`);
  });
};

void start();

