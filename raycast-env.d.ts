/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Default Working Directory - Default directory for all new threads. */
  "defaultProjectDirectory"?: string,
  /** Working Directory Root - Parent folder whose subfolders appear as working directory choices. */
  "projectsDirectory"?: string,
  /** Codex CLI Path - Optional absolute path to the Codex CLI. Leave blank for auto-discovery. */
  "codexCliPath"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-threads` command */
  export type SearchThreads = ExtensionPreferences & {}
  /** Preferences accessible in the `manage-projects` command */
  export type ManageProjects = ExtensionPreferences & {}
  /** Preferences accessible in the `new-thread` command */
  export type NewThread = ExtensionPreferences & {}
  /** Preferences accessible in the `new-thread-with-prompt` command */
  export type NewThreadWithPrompt = ExtensionPreferences & {}
  /** Preferences accessible in the `new-thread-from-clipboard` command */
  export type NewThreadFromClipboard = ExtensionPreferences & {}
  /** Preferences accessible in the `open-codex` command */
  export type OpenCodex = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-threads` command */
  export type SearchThreads = {}
  /** Arguments passed to the `manage-projects` command */
  export type ManageProjects = {}
  /** Arguments passed to the `new-thread` command */
  export type NewThread = {}
  /** Arguments passed to the `new-thread-with-prompt` command */
  export type NewThreadWithPrompt = {}
  /** Arguments passed to the `new-thread-from-clipboard` command */
  export type NewThreadFromClipboard = {}
  /** Arguments passed to the `open-codex` command */
  export type OpenCodex = {}
}

