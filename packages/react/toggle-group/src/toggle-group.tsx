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
  useToggleGroupSingle,
  useToggleGroupMultiple,
} from "@flt-ui/react-use-toggle-group";
import { Primitive } from "@flt-ui/react-primitive";
import { createCollection, isBoth } from "@flt-ui/react-collection";
import { useDirection } from "@flt-ui/react-direction";
import { useComposedEvent } from "@flt-ui/react-use-event";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { useFocusIntent } from "@flt-ui/react-use-focus-intent";
import { useFocusWithin } from "@flt-ui/react-use-focus-within";
import { focusElement } from "@flt-ui/a11y";

import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";
import type { These } from "@flt-ui/react-collection";

const OWNER_NAME = "ToggleGroup";
const SELECTORS = "[role='toolbar']";

type ScopedProps<P> = P & {
  __scopeToggleGroup?: Scope;
};

const [Collection, useCollection, createCollectionScope] =
  createCollection(OWNER_NAME);

const [createToggleGroupContext, createToggleGroupScope] = createContextScope(
  OWNER_NAME,
  [createCollectionScope],
);

type FC<P> = (props: P) => React.ReactNode;

type ToggleGroupImplSingleProps = ToggleGroupSingleProps & {
  mode: "single";
};

type ToggleGroupImplSingleFC = ToggleGroupSingleFC;

type ToggleGroupImplMultipleProps = ToggleGroupMultipleProps & {
  mode: "multiple";
};

type ToggleGroupImplMultipleFC = ToggleGroupMultipleFC;

type ToggleGroupProps =
  | ToggleGroupImplSingleProps
  | ToggleGroupImplMultipleProps;

type ToggleGroupFC = FC<ToggleGroupProps> & {
  __ownerName?: string;
};

function createToggleGroup(ownerName: string): ToggleGroupFC {
  const ToggleGroupImplSingle: ToggleGroupImplSingleFC =
    createToggleGroupSingle(ownerName);

  const ToggleGroupImplMultiple: ToggleGroupImplMultipleFC =
    createToggleGroupMultiple(ownerName);

  const ToggleGroup = ((
    props: ScopedProps<ToggleGroupProps>,
  ): React.JSX.Element => {
    let { ref, mode, ...rest } = props;

    switch (mode) {
      case "single":
        let singleProps = rest as ToggleGroupSingleProps;

        return (
          <Collection.Provider scope={props.__scopeToggleGroup}>
            <ToggleGroupImplSingle {...singleProps} ref={ref} />
          </Collection.Provider>
        );
      case "multiple":
        let multipleProps = rest as ToggleGroupMultipleProps;

        return (
          <Collection.Provider scope={props.__scopeToggleGroup}>
            <ToggleGroupImplMultiple {...multipleProps} ref={ref} />
          </Collection.Provider>
        );
      default:
        throw new Error(
          `${ownerName} component: Invalid prop 'mode' supplied. Expected one of 'single' | 'multiple'.`,
        );
    }
  }) as ToggleGroupFC;

  ToggleGroup.__ownerName = ownerName;

  return ToggleGroup;
}

/**
 * ToggleGroupImpl
 */
type ToggleGroupImplContextValue = {
  disabled: true | undefined;
  orientation: "horizontal" | "vertical" | undefined;
  dir: "ltr" | "rtl";
  rovingFocus: boolean;
};

const [ToggleGroupImplContext, useToggleGroupContext] =
  createToggleGroupContext<ToggleGroupImplContextValue>(OWNER_NAME);

/**
 * FocusableContext
 */
type FocusableContextValue = {
  focusableValue: string | null;
  onFocusableValueChange: (focusableValue: string | null) => void;
};

const [FocusableContext, useFocusableContext] =
  createToggleGroupContext<FocusableContextValue>(OWNER_NAME);

type ToggleGroupImplProps = Omit<
  PrimitiveProps<"div">,
  "defaultValue" | "dir"
> & {
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  rovingFocus?: boolean;
  loop?: boolean;
};

type ToggleGroupImplFC = FC<ToggleGroupImplProps> & {
  __ownerName?: string;
};

function createToggleGroupImpl(ownerName: string): ToggleGroupImplFC {
  const ToggleGroupImpl = ((
    props: ScopedProps<ToggleGroupImplProps>,
  ): React.JSX.Element => {
    let {
      ref,
      disabled: _disabled = false,
      orientation,
      dir,
      rovingFocus = true,
      loop = true,
      ...rest
    } = props;

    let [node, setNode] = React.useState<HTMLDivElement | null>(null);
    let composedRefs = useComposedRefs(ref, setNode);
    let direction = useDirection(dir);
    let fromCollection = useCollection(props.__scopeToggleGroup);
    let focusIntent = useFocusIntent(direction, orientation);
    let [focusableValue, setFocusableValue] = React.useState<string | null>(
      null,
    );

    let container = node?.closest(SELECTORS);
    let isWithinContainer = node ? !!container : true;
    let disabled = _disabled || undefined;

    let { onFocus, onBlur } = useFocusWithin({
      onFocusWithin: (): void => {
        return /** UNUSED */;
      },

      onBlurWithin: (): void => {
        return /** UNUSED */;
      },
    });

    const handleKeyDown = useComposedEvent(props.onKeyDown, (event): void => {
      let { key } = event;

      if (disabled) {
        return /** UNUSED */;
      }

      let intent = focusIntent.getFocusIntent(key);

      if (intent === undefined) {
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
            loop: loop,
          });
          break;
        case "NEXT":
          next = fromCollection.getNextNode({
            loop: loop,
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

    const handleFocus = useComposedEvent(props.onFocus, onFocus);

    const handleBlur = useComposedEvent(props.onBlur, onBlur);

    return (
      <ToggleGroupImplContext.Provider
        scope={props.__scopeToggleGroup}
        disabled={disabled}
        orientation={orientation}
        dir={direction}
        rovingFocus={isWithinContainer ? false : rovingFocus}
      >
        <FocusableContext.Provider
          scope={props.__scopeToggleGroup}
          focusableValue={focusableValue}
          onFocusableValueChange={setFocusableValue}
        >
          {rovingFocus ? (
            <Collection.Slot scope={props.__scopeToggleGroup}>
              <Primitive.div
                {...rest}
                ref={composedRefs}
                data-flt-orientation={orientation}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </Collection.Slot>
          ) : (
            <Primitive.div
              {...rest}
              ref={composedRefs}
              data-flt-orientation={orientation}
            />
          )}
        </FocusableContext.Provider>
      </ToggleGroupImplContext.Provider>
    );
  }) as ToggleGroupImplFC;

  ToggleGroupImpl.__ownerName = ownerName + "Impl";

  return ToggleGroupImpl;
}

/**
 * ValueContextValue
 */
type ValueContextValue = {
  value: string[];
  onItemActivate: (value: string) => void;
  onItemDeactivate: (value: string) => void;
};

const [ValueContext, useValueContext] =
  createToggleGroupContext<ValueContextValue>(OWNER_NAME);

/**
 * ToggleGroupSingle
 */
type ToggleGroupSingleProps = ToggleGroupImplProps & {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
};

type ToggleGroupSingleFC = FC<ToggleGroupSingleProps> & {
  __ownerName?: string;
};

function createToggleGroupSingle(ownerName: string): ToggleGroupSingleFC {
  const ToggleGroupImpl: ToggleGroupImplFC = createToggleGroupImpl(ownerName);

  const ToggleGroupSingle = ((
    props: ScopedProps<ToggleGroupSingleProps>,
  ): React.JSX.Element => {
    let {
      ref,
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      ...rest
    } = props;

    let { value, onItemActivate, onItemDeactivate } = useToggleGroupSingle({
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      caller: ownerName,
    });

    return (
      <ValueContext.Provider
        scope={props.__scopeToggleGroup}
        value={value != null ? [value] : []}
        onItemActivate={onItemActivate}
        onItemDeactivate={onItemDeactivate}
      >
        <ToggleGroupImpl {...rest} ref={ref} />
      </ValueContext.Provider>
    );
  }) as ToggleGroupSingleFC;

  ToggleGroupSingle.__ownerName = ownerName + "Single";

  return ToggleGroupSingle;
}

/**
 * ToggleGroupMultiple
 */
type ToggleGroupMultipleProps = ToggleGroupImplProps & {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

type ToggleGroupMultipleFC = FC<ToggleGroupMultipleProps> & {
  __ownerName?: string;
};

function createToggleGroupMultiple(ownerName: string): ToggleGroupMultipleFC {
  const ToggleGroupImpl: ToggleGroupImplFC = createToggleGroupImpl(ownerName);

  const ToggleGroupMultiple = ((
    props: ScopedProps<ToggleGroupMultipleProps>,
  ): React.JSX.Element => {
    let {
      ref,
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      ...rest
    } = props;

    let { value, onItemActivate, onItemDeactivate } = useToggleGroupMultiple({
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      caller: ownerName,
    });

    return (
      <ValueContext.Provider
        scope={props.__scopeToggleGroup}
        value={value}
        onItemActivate={onItemActivate}
        onItemDeactivate={onItemDeactivate}
      >
        <ToggleGroupImpl {...rest} ref={ref} />
      </ValueContext.Provider>
    );
  }) as ToggleGroupMultipleFC;

  ToggleGroupMultiple.__ownerName = ownerName + "ImplMultiple";

  return ToggleGroupMultiple;
}

const ToggleGroup: ToggleGroupFC = createToggleGroup(OWNER_NAME);

export { ToggleGroup, ToggleGroup as Root };
export type { ToggleGroupProps };

export { createToggleGroup };
export type { ToggleGroupFC };

export { createToggleGroupContext, createToggleGroupScope };

export { Collection };

export { useToggleGroupContext, useFocusableContext, useValueContext };
