import { clsx } from "@flt-ui/clsx";
import * as Dialog from "@flt-ui/react-dialog";
import * as VisuallyHidden from "@flt-ui/react-visually-hidden";
import * as Portal from "@flt-ui/react-portal";

import type * as React from "react";

function DialogDemo(): React.JSX.Element {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={clsx(
          "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-slate-50 outline-none transition-colors hover:bg-slate-950/90 focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2",
        )}
      >
        Open Dialog
      </Dialog.Trigger>
      <Portal.Root>
        <Dialog.Backdrop
          className={clsx("z-1050 fixed inset-0 bg-slate-950/65 backdrop-blur")}
        />
        <Dialog.Content
          className={clsx(
            "z-1050 fixed left-2/4 top-2/4 grid w-full max-w-lg -translate-x-2/4 -translate-y-2/4  gap-4 border border-slate-200 bg-slate-50 p-6 shadow-lg sm:rounded-lg",
          )}
        >
          <Dialog.Title
            className={clsx(
              "text-lg font-semibold leading-none tracking-tight",
            )}
          >
            This is the dialog title
          </Dialog.Title>
          <Dialog.Description className={clsx("text-sm text-slate-950/65")}>
            This is the dialog description
          </Dialog.Description>

          <Dialog.Close
            className={clsx(
              "absolute right-4 top-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xl font-medium opacity-50 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2",
            )}
          >
            &#x2715;
            <VisuallyHidden.Root>Close Dialog</VisuallyHidden.Root>
          </Dialog.Close>
        </Dialog.Content>
      </Portal.Root>
    </Dialog.Root>
  );
}

export { DialogDemo };
