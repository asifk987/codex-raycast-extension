import nodePath from "node:path";

// Current ChatGPT app builds keep the CLI in codex-cli/bin. Older builds put it
// directly in Resources.
export const bundledCodexCliPaths = [
  "/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex",
  "/Applications/ChatGPT.app/Contents/Resources/codex",
];

// Homebrew, npm -g, and the official standalone installer symlink.
export function userInstalledCodexCliPaths(homeDirectory: string): string[] {
  return [
    "/opt/homebrew/bin/codex",
    "/usr/local/bin/codex",
    nodePath.join(homeDirectory, ".local", "bin", "codex"),
  ];
}

// Managed standalone install written by the Codex app updater.
export function standaloneCodexCliPath(homeDirectory: string): string {
  return nodePath.join(
    homeDirectory,
    ".codex",
    "packages",
    "standalone",
    "current",
    "codex",
  );
}

export function buildCodexCliCandidatePaths(
  preferredPath: string | undefined,
  homeDirectory: string,
): string[] {
  return Array.from(
    new Set([
      ...(preferredPath ? [preferredPath] : []),
      ...bundledCodexCliPaths,
      standaloneCodexCliPath(homeDirectory),
      ...userInstalledCodexCliPaths(homeDirectory),
    ]),
  );
}
