export function isDarkMode(options) {
  return options.colorScheme !== "system"
    ? options.colorScheme === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
}
