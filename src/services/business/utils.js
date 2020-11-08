import { DEFAULT_OPTIONS } from "@/services/business/storage/defaults";

export function isDarkMode(colorScheme = DEFAULT_OPTIONS.colorScheme) {
  return colorScheme !== "system"
    ? colorScheme === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
}
