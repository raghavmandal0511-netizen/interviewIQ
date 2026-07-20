import { env } from "@/config/env";

export const siteConfig = {
  name: env.appName,
  description:
    "Interview preparation platform for aptitude, HR, and AI interviews.",
  url: env.appUrl,
} as const;
