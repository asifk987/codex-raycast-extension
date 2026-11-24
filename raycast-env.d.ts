/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Default Mode - Which mode new threads open in: Codex, Work, or Chat */
  "newThreadMode": "codex" | "work" | "chat",
  /** Default Working Directory - Default directory for all new Codex threads */
  "defaultProjectDirectory"?: string,
  /** Working Directory Root - Folder whose subfolders become working directory choices (for example, ~/projects or ~/dev) */
  "projectsDirectory"?: string,
  /** Terminal App - Terminal opened by thread actions */
  "terminalApp": "terminal" | "ghostty" | "iterm",
  /** Codex CLI Path - Codex CLI binary path (leave blank to auto-detect) */
  "codexCliPath"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-threads` command */
  export type SearchThreads = ExtensionPreferences & {}
  /** Preferences accessible in the `manage-projects` command */
  export type ManageProjects = ExtensionPreferences & {}
  /** Preferences accessible in the `usage-stats` command */
  export type UsageStats = ExtensionPreferences & {}
  /** Preferences accessible in the `manage-mcp-servers` command */
  export type ManageMcpServers = ExtensionPreferences & {}
  /** Preferences accessible in the `new-thread` command */
  export type NewThread = ExtensionPreferences & {}
  /** Preferences accessible in the `new-thread-with-prompt` command */
  export type NewThreadWithPrompt = ExtensionPreferences & {}
  /** Preferences accessible in the `new-thread-from-clipboard` command */
  export type NewThreadFromClipboard = ExtensionPreferences & {}
  /** Preferences accessible in the `new-thread-from-selected-text` command */
  export type NewThreadFromSelectedText = ExtensionPreferences & {
  /** Prompt Prefix - Optional text to preface the selection with */
  "selectedTextPromptPrefix"?: string
}
  /** Preferences accessible in the `open-codex` command */
  export type OpenCodex = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-threads` command */
  export type SearchThreads = {}
  /** Arguments passed to the `manage-projects` command */
  export type ManageProjects = {}
  /** Arguments passed to the `usage-stats` command */
  export type UsageStats = {}
  /** Arguments passed to the `manage-mcp-servers` command */
  export type ManageMcpServers = {}
  /** Arguments passed to the `new-thread` command */
  export type NewThread = {}
  /** Arguments passed to the `new-thread-with-prompt` command */
  export type NewThreadWithPrompt = {}
  /** Arguments passed to the `new-thread-from-clipboard` command */
  export type NewThreadFromClipboard = {}
  /** Arguments passed to the `new-thread-from-selected-text` command */
  export type NewThreadFromSelectedText = {}
  /** Arguments passed to the `open-codex` command */
  export type OpenCodex = {}
}

