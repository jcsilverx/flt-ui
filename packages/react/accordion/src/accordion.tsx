/**
 * Copyright 2025 flt/ui. All rights reserved.
 *
 * This file is Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { createContextScope } from "@flt-ui/react-context-scope";
import {
  useAccordionSingle,
  useAccordionMultiple,
} from "@flt-ui/react-use-accordion";
import { Primitive } from "@flt-ui/react-primitive";
import { createCollapsibleScope } from "@flt-ui/react-collapsible";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { useDirection } from "@flt-ui/react-direction";
import { useComposedEvent } from "@flt-ui/react-use-event";
import { useFocusIntent } from "@flt-ui/react-use-focus-intent";
import { createCollection, isBoth } from "@flt-ui/react-collection";
import { focusElement } from "@flt-ui/a11y";

import type { Scope, ScopeHook } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";
import type { These } from "@flt-ui/react-collection";

const OWNER_NAME = "Accordion";
const ACCORDION_KEYS = [
  "Home",
  "End",
  "ArrowRight",
  "ArrowDown",
  "ArrowLeft",
  "ArrowUp",
];

type ScopedProps<P> = P & {
  __scopeAccordion?: Scope;
};

const [Collection, useCollection, createCollectionScope] =
  createCollection(OWNER_NAME);

const [createAccordionContext, createAccordionScope] = createContextScope(
  OWNER_NAME,
  [createCollapsibleScope, createCollectionScope],
);

const useCollapsibleScope: ScopeHook = createCollapsibleScope();

type AccordionState = "open" | "closed";

type FC<P> = (props: P) => React.ReactNode;

type AccordionImplSingleProps = AccordionSingleProps & {
  mode: "single";
};

type AccordionImplSingleFC = AccordionSingleFC;

type AccordionImplMultipleProps = AccordionMultipleProps & {
  mode: "multiple";
};

type AccordionImplMultipleFC = AccordionMultipleFC;

type AccordionProps = AccordionImplSingleProps | AccordionImplMultipleProps;

type AccordionFC = FC<AccordionProps> & {
  __ownerName?: string;
};

function createAccordion(ownerName: string): AccordionFC {
  const AccordionImplSingle: AccordionImplSingleFC =
    createAccordionSingle(ownerName);

  const AccordionImplMultiple: AccordionImplMultipleFC =
    createAccordionMultiple(ownerName);

  const Accordion = ((
    props: ScopedProps<AccordionProps>,
  ): React.JSX.Element => {
    let { ref, mode, ...rest } = props;

    switch (mode) {
      case "single":
        let singleProps = rest as AccordionSingleProps;

        return (
          <Collection.Provider scope={props.__scopeAccordion}>
            <AccordionImplSingle {...singleProps} ref={ref} />
          </Collection.Provider>
        );
      case "multiple":
        let multipleProps = rest as AccordionMultipleProps;

        return (
          <Collection.Provider scope={props.__scopeAccordion}>
            <AccordionImplMultiple {...multipleProps} ref={ref} />
          </Collection.Provider>
        );
      default:
        throw new Error(
          `${ownerName} component: Invalid prop 'mode' supplied. Expected one of 'single' | 'multiple'.`,
        );
    }
  }) as AccordionFC;

  Accordion.__ownerName = ownerName;

  return Accordion;
}

/**
 * AccordionImpl
 */
type AccordionImplContextValue = {
  disabled: true | undefined;
  orientation: "horizontal" | "vertical";
  dir: "ltr" | "rtl";
};

const [AccordionImplContext, useAccordionContext] =
  createAccordionContext<AccordionImplContextValue>(OWNER_NAME);

type AccordionImplProps = Omit<
  PrimitiveProps<"div">,
  "defaultValue" | "dir"
> & {
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  keyboard?: boolean;
};

type AccordionImplFC = FC<AccordionImplProps> & {
  __ownerName?: string;
};

function createAccordionImpl(ownerName: string): AccordionImplFC {
  const AccordionImpl = ((
    props: ScopedProps<AccordionImplProps>,
  ): React.JSX.Element => {
    let {
      ref,
      disabled: _disabled = false,
      orientation = "vertical",
      dir,
      keyboard = true,
      ...rest
    } = props;

    let node = React.useRef<globalThis.HTMLDivElement>(null);
    let composedRefs = useComposedRefs(ref, node);
    let direction = useDirection(dir);
    let focusIntent = useFocusIntent(direction, orientation);
    let fromCollection = useCollection(props.__scopeAccordion);

    let disabled = _disabled || undefined;

    const handleKeyDown = useComposedEvent(props.onKeyDown, (event): void => {
      let { key } = event;

      if (!keyboard || disabled || !ACCORDION_KEYS.includes(key)) {
        return /** UNUSED */;
      }

      let intent = focusIntent.getFocusIntent(key);

      if (intent == null) {
        return /** UNUSED */;
      }

      let next: These<unknown, globalThis.Node | null>;

      event.preventDefault();

      switch (intent) {
        case "FIRST":
          next = fromCollection.getFirstNode();
          break;
        case "PREV":
          next = fromCollection.getPreviousNode({
            loop: true,
          });
          break;
        case "NEXT":
          next = fromCollection.getNextNode({
            loop: true,
          });
          break;
        case "LAST":
          next = fromCollection.getLastNode();
          break;
      }

      if (!isBoth(next) || next.right == null) {
        return /** UNUSED */;
      }

      focusElement(next.right);

      return /** UNUSED */;
    });

    return (
      <AccordionImplContext.Provider
        scope={props.__scopeAccordion}
        disabled={disabled}
        orientation={orientation}
        dir={direction}
      >
        <Collection.Slot scope={props.__scopeAccordion}>
          <Primitive.div
            {...rest}
            ref={composedRefs}
            data-flt-orientation={orientation}
            onKeyDown={handleKeyDown}
          />
        </Collection.Slot>
      </AccordionImplContext.Provider>
    );
  }) as AccordionImplFC;

  AccordionImpl.__ownerName = ownerName + "Impl";

  return AccordionImpl;
}

/**
 * ValueContextValue
 */
type ValueContextValue = {
  value: string[];
  onItemOpen: (value: string) => void;
  onItemClose: (value: string) => void;
};

const [ValueContext, useValueContext] =
  createAccordionContext<ValueContextValue>(OWNER_NAME);

/**
 * CollapsibleContext
 */
type CollapsibleContextValue = {
  collapsible: boolean;
};

const [CollapsibleContext, useCollapsibleContext] =
  createAccordionContext<CollapsibleContextValue>(OWNER_NAME, {
    defaultValue: {
      collapsible: false,
    },
  });

/**
 * AccordionSingle
 */
type AccordionSingleProps = AccordionImplProps & {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  collapsible?: boolean;
};

type AccordionSingleFC = FC<AccordionSingleProps> & {
  __ownerName?: string;
};

function createAccordionSingle(ownerName: string): AccordionSingleFC {
  const AccordionImpl: AccordionImplFC = createAccordionImpl(ownerName);

  const AccordionSingle = ((
    props: ScopedProps<AccordionSingleProps>,
  ): React.JSX.Element => {
    let {
      ref,
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      collapsible = false,
      ...rest
    } = props;

    let { value, onItemOpen, onItemClose } = useAccordionSingle({
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      collapsible,
      caller: ownerName,
    });

    return (
      <ValueContext.Provider
        scope={props.__scopeAccordion}
        value={value ? [value] : []}
        onItemOpen={onItemOpen}
        onItemClose={onItemClose}
      >
        <CollapsibleContext.Provider
          scope={props.__scopeAccordion}
          collapsible={collapsible}
        >
          <AccordionImpl {...rest} ref={ref} />
        </CollapsibleContext.Provider>
      </ValueContext.Provider>
    );
  }) as AccordionSingleFC;

  AccordionSingle.__ownerName = ownerName + "Single";

  return AccordionSingle;
}

/**
 * AccordionMultiple
 */
type AccordionMultipleProps = AccordionImplProps & {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

type AccordionMultipleFC = FC<AccordionMultipleProps> & {
  __ownerName?: string;
};

function createAccordionMultiple(ownerName: string): AccordionMultipleFC {
  const AccordionImpl: AccordionImplFC = createAccordionImpl(ownerName);

  const AccordionMultiple = ((
    props: ScopedProps<AccordionMultipleProps>,
  ): React.JSX.Element => {
    let {
      ref,
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      ...rest
    } = props;

    let { value, onItemOpen, onItemClose } = useAccordionMultiple({
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      caller: ownerName,
    });

    return (
      <ValueContext.Provider
        scope={props.__scopeAccordion}
        value={value}
        onItemOpen={onItemOpen}
        onItemClose={onItemClose}
      >
        <CollapsibleContext.Provider
          scope={props.__scopeAccordion}
          collapsible={true}
        >
          <AccordionImpl {...rest} ref={ref} />
        </CollapsibleContext.Provider>
      </ValueContext.Provider>
    );
  }) as AccordionMultipleFC;

  AccordionMultiple.__ownerName = ownerName + "Multiple";

  return AccordionMultiple;
}

const Accordion: AccordionFC = createAccordion(OWNER_NAME);

const getState = (open: boolean): AccordionState => {
  return open ? "open" : "closed";
};

export { Accordion, Accordion as Root };
export type { AccordionProps };

export { createAccordion, getState };
export type { AccordionFC };

export { createAccordionContext, createAccordionScope };

export {
  useCollapsibleScope,
  useAccordionContext,
  useValueContext,
  useCollapsibleContext,
};

export { Collection };
