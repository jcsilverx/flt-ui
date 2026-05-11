import { clsx } from "@flt-ui/clsx";
import { VisuallyHidden } from "@flt-ui/react-visually-hidden";

import type * as React from "react";

function VisuallyHiddenDemo(): React.JSX.Element {
  return (
    <VisuallyHidden focusable={true}>
      <a
        href="."
        tabIndex={0}
        className={clsx(
          "outline-none focus-visible:underline focus-visible:underline-offset-2",
        )}
      >
        link
      </a>
    </VisuallyHidden>
  );
}

export { VisuallyHiddenDemo };
