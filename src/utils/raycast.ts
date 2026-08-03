import { closeMainWindow, popToRoot, showToast, Toast } from "@raycast/api";
import { showFailureToast } from "@raycast/utils";

type NoViewCommandOptions = {
  popToRoot?: boolean;
};

export async function runNoViewCommand(
  action: () => Promise<void>,
  { popToRoot: shouldPopToRoot = false }: NoViewCommandOptions = {},
): Promise<void> {
  await closeMainWindow();
  await action();

  if (shouldPopToRoot) {
    await popToRoot();
  }
}

export async function runNoViewActionWithFailureToast(
  failureTitle: string,
  action: () => Promise<void>,
): Promise<void> {
  try {
    await runNoViewCommand(action, { popToRoot: true });
  } catch (error) {
    await showFailureToast(error, { title: failureTitle });
  }
}

export async function revalidateWithToast(
  revalidate: () => Promise<unknown>,
  {
    successTitle,
    failureTitle,
  }: { successTitle: string; failureTitle: string },
): Promise<void> {
  try {
    await revalidate();
    await showToast({ style: Toast.Style.Success, title: successTitle });
  } catch (error) {
    await showFailureToast(error, { title: failureTitle });
  }
}
