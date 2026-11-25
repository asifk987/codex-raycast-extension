import {
  Action,
  ActionPanel,
  Detail,
  Icon,
  Keyboard,
  List,
} from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { useRef } from "react";
import {
  type CodexThread,
  type CodexThreadSearchOccurrence,
  readThreadTurnMessages,
  searchThreadOccurrences,
} from "./utils/app-server";
import { getThreadDisplayTitle } from "./utils/format";
import { openCodexThread } from "./utils/launch";
import { cleanCodexUserMessage } from "./utils/message-cleaning";
import { runNoViewActionWithFailureToast } from "./utils/raycast";

export function ThreadMatchesList({
  thread,
  searchTerm,
}: {
  thread: CodexThread;
  searchTerm: string;
}) {
  const abortable = useRef<AbortController>(undefined);
  const { data, error, isLoading, revalidate } = usePromise(
    (threadId: string, term: string) =>
      searchThreadOccurrences(threadId, term, abortable.current?.signal),
    [thread.id, searchTerm],
    { abortable, failureToastOptions: { title: "Couldn't load matches" } },
  );
  const occurrences = data?.occurrences ?? [];
  const count = occurrences.length;

  return (
    <List
      isLoading={isLoading}
      isShowingDetail
      navigationTitle={`Matches for "${searchTerm}"`}
      searchBarPlaceholder="Filter matches"
    >
      <List.Section
        title="Messages"
        subtitle={`${count} ${count === 1 ? "match" : "matches"}`}
      >
        {occurrences.map((occurrence, index) => (
          <List.Item
            key={String(index)}
            id={String(index)}
            title={collapseWhitespace(occurrence.snippet).trim()}
            detail={
              <List.Item.Detail markdown={buildMatchMarkdown(occurrence)} />
            }
            actions={
              <ActionPanel>
                <Action.Push
                  title="Show in Conversation"
                  icon={Icon.Message}
                  target={
                    <ThreadTurnDetail thread={thread} occurrence={occurrence} />
                  }
                />
                <OpenInCodexAction thread={thread} />
                <Action.CopyToClipboard
                  title="Copy Excerpt"
                  content={occurrence.snippet}
                  shortcut={Keyboard.Shortcut.Common.Copy}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>

      {!isLoading && count === 0 ? (
        error ? (
          <List.EmptyView
            icon={Icon.Warning}
            title="Couldn't Load Matches"
            description={error.message}
            actions={
              <ActionPanel>
                <Action
                  title="Retry"
                  icon={Icon.ArrowClockwise}
                  onAction={revalidate}
                />
              </ActionPanel>
            }
          />
        ) : (
          <List.EmptyView
            icon={Icon.MagnifyingGlass}
            title="No Matches in Messages"
            description={`"${searchTerm}" may be in this thread's name, folder, commands, or tool output.`}
          />
        )
      ) : null}
    </List>
  );
}

function ThreadTurnDetail({
  thread,
  occurrence,
}: {
  thread: CodexThread;
  occurrence: CodexThreadSearchOccurrence;
}) {
  const abortable = useRef<AbortController>(undefined);
  const { data, isLoading } = usePromise(
    (threadId: string, turnCursor: string) =>
      readThreadTurnMessages(threadId, turnCursor, abortable.current?.signal),
    [thread.id, occurrence.turnCursor],
    {
      abortable,
      failureToastOptions: { title: "Couldn't load conversation" },
    },
  );
  const messages = data ?? [];
  const markdown =
    !isLoading && messages.length === 0
      ? "This part of the conversation has no readable messages."
      : messages
          .map((message) =>
            message.role === "user"
              ? `### User\n\n${cleanCodexUserMessage(message.text, "compact")}`
              : `### Codex\n\n${message.text}`,
          )
          .join("\n\n");

  return (
    <Detail
      isLoading={isLoading}
      navigationTitle={getThreadDisplayTitle(thread)}
      markdown={markdown}
      actions={
        <ActionPanel>
          <OpenInCodexAction thread={thread} />
          <Action.CopyToClipboard
            title="Copy Conversation"
            content={markdown}
            shortcut={Keyboard.Shortcut.Common.Copy}
          />
        </ActionPanel>
      }
    />
  );
}

function OpenInCodexAction({ thread }: { thread: CodexThread }) {
  return (
    <Action
      title="Open in Codex"
      icon={Icon.AppWindow}
      onAction={() =>
        runNoViewActionWithFailureToast("Unable to open thread in Codex", () =>
          openCodexThread(thread.id),
        )
      }
    />
  );
}

export function buildMatchMarkdown(
  occurrence: CodexThreadSearchOccurrence,
): string {
  const { snippet, snippetMatchRange } = occurrence;
  const before = collapseWhitespace(snippet.slice(0, snippetMatchRange.start));
  const match = collapseWhitespace(
    snippet.slice(snippetMatchRange.start, snippetMatchRange.end),
  );
  const after = collapseWhitespace(snippet.slice(snippetMatchRange.end));
  // Trim only the outer ends so the spaces around the match survive.
  return `> ${before.trimStart()}**${match}**${after.trimEnd()}`;
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ");
}
