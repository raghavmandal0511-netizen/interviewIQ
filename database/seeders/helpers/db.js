import path from "path";
import { pathToFileURL } from "url";
import Category from "../../../backend/src/database/models/category/category.model.js";
import { BACKEND_DIR, BACKEND_ENV_PATH } from "./paths.js";
import { logger } from "./logger.js";

/** Same mongoose singleton used by all backend models. */
export const mongoose = Category.base;

const dotenvHref = pathToFileURL(
  path.join(BACKEND_DIR, "node_modules", "dotenv", "lib", "main.js")
).href;
const dotenvModule = await import(dotenvHref);
const dotenv = dotenvModule.default || dotenvModule;
dotenv.config({ path: BACKEND_ENV_PATH });

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error(
      `MONGO_URI is not set. Create backend/.env with MONGO_URI=mongodb://localhost:27017/interviewIQ`
    );
  }
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  logger.info("Connected to MongoDB");
}

export async function disconnectDB() {
  await mongoose.disconnect();
  logger.info("Disconnected from MongoDB");
}
