"use client";

import { clsx } from "@flt-ui/clsx";
import * as Toolbar from "@flt-ui/react-toolbar";
import * as ToggleGroup from "@flt-ui/react-toggle-group";
import * as Checkbox from "@flt-ui/react-checkbox";
import * as Separator from "@flt-ui/react-separator";
import * as Label from "@flt-ui/react-label";

const group1 = [
  {
    value: "bold",
    label: "Bold",
    text: "B",
  },
  {
    value: "italic",
    label: "Italic",
    text: "I",
  },
  {
    value: "underline",
    label: "Underline",
    text: "U",
  },
] as const;

const group2 = [
  {
    value: "left",
    label: "Left",
  },
  {
    value: "center",
    label: "Center",
  },
  {
    value: "right",
    label: "Right",
  },
] as const;

function ToolbarDemo(): React.JSX.Element {
  return (
    <Toolbar.Root
      className={clsx(
        "flex h-12 min-w-[320px] max-w-4xl items-center rounded-sm border border-slate-950/20 px-2 py-4 shadow shadow-slate-950/20",
      )}
    >
      <ToggleGroup.Root
        role="group"
        className={clsx("flex items-center gap-1")}
        mode="multiple"
        aria-label="Formatting options"
      >
        {group1.map((item, index): React.JSX.Element => {
          return (
            <ToggleGroup.Item
              key={index}
              className={clsx(
                "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-sm font-medium outline-none transition-[color,background,border,text] hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-0 data-[flt-state=active]:bg-gray-200 data-[flt-state=on]:bg-slate-200",
              )}
              value={item.value}
              aria-label={item.label}
            >
              <span
                className={clsx("pointer-events-none font-bold", {
                  "underline underline-offset-4": item.value === "underline",
                })}
                aria-hidden={true}
              >
                {item.text}
              </span>
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>

      <Separator.Root
        className={clsx(
          "mx-4 hidden bg-slate-950/15 data-[flt-orientation=vertical]:h-full data-[flt-orientation=vertical]:w-px sm:block",
        )}
        orientation="vertical"
      />

      <ToggleGroup.Root
        role="group"
        className={clsx("hidden items-center gap-1 sm:flex")}
        mode="single"
        aria-label="Text alignment"
      >
        {group2.map((gr, index): React.JSX.Element => {
          return (
            <ToggleGroup.Item
              key={index}
              className={clsx(
                "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-sm font-medium outline-none transition-[color,background,border,text] hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-0 data-[flt-state=active]:bg-gray-200 data-[flt-state=on]:bg-slate-200",
              )}
              value={gr.value}
              aria-label={gr.label}
            >
              <span
                className={clsx("pointer-events-none text-[.938rem] font-bold")}
                aria-hidden={true}
              >
                {gr.value === "left" ? (
                  <>&#x2631;</>
                ) : gr.value === "right" ? (
                  <>&#x2634;</>
                ) : (
                  <>&#x2632;</>
                )}
              </span>
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>

      <Separator.Root
        className={clsx(
          "mx-4 bg-slate-950/15 data-[flt-orientation=vertical]:h-full data-[flt-orientation=vertical]:w-px",
        )}
        orientation="vertical"
      />

      <div className="flex items-center space-x-2">
        <Checkbox.Root>
          <Checkbox.Trigger
            id="mode"
            className={clsx(
              "rounded-xs shadow-xs size-4 shrink-0 border outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2",
            )}
          >
            <Checkbox.Indicator
              className={clsx(
                "flex items-center justify-center text-current transition-none",
              )}
            >
              <CheckboxIcon
                className={clsx(
                  "pointer-events-none flex size-3.5 items-center justify-center",
                )}
              />
            </Checkbox.Indicator>
          </Checkbox.Trigger>
        </Checkbox.Root>
        <Label.Root
          htmlFor="mode"
          className={clsx(
            "flex items-center gap-2 text-sm font-semibold leading-none",
          )}
        >
          Night mode
        </Label.Root>
      </div>

      <Separator.Root
        className={clsx(
          "mx-4 hidden bg-slate-950/15 data-[flt-orientation=vertical]:h-full data-[flt-orientation=vertical]:w-px sm:block",
        )}
        orientation="vertical"
      />

      <Link
        className={clsx(
          "me-4 hidden text-sm text-slate-950/40 outline-none focus-visible:underline focus-visible:underline-offset-2 sm:inline-block",
        )}
        href="#"
      >
        Edited 2 hours ago
      </Link>

      <Button
        className={clsx(
          "ms-auto inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-slate-50 outline-none transition-[color,background,border,text] hover:bg-slate-950/90 focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2",
        )}
      >
        Share
      </Button>
    </Toolbar.Root>
  );
}

function CheckboxIcon({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <span className={className} aria-hidden={true}>
      &#x2713;
    </span>
  );
}

const SPACE_KEY = " ";

function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}

function Link({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}): React.JSX.Element {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
  ): void => {
    let { key, currentTarget } = event;

    if (key !== SPACE_KEY) {
      return void 0;
    }

    currentTarget.click();
  };

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      /**
       * Using target="_blank" without rel="noreferrer" (which implies rel="noopener")
       * is a security risk in older browsers.
       *
       * @see https://mathiasbynens.github.io/rel-noopener/#recommendations
       */
      rel="noreferrer"
      onKeyDown={handleKeyDown}
    >
      {children}
    </a>
  );
}

export { ToolbarDemo };
