import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function createPageUrl(pageName) {
  if (!pageName) return "/";
  return "/" + pageName.toLowerCase();
}

export function createApiUrl(apiName) {
  if (!apiName) return "http://localhost:8000";
  return "http://localhost:8000/" + apiName.toLowerCase();
}