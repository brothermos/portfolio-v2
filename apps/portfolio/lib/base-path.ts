/** Must match `basePath` in next.config.ts (empty when app is served at domain root). */
export const BASE_PATH = "";

/** Prefix an app-relative path with the Next.js basePath. */
export function appPath(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return BASE_PATH || "/";
  return `${BASE_PATH}${normalized}`;
}
