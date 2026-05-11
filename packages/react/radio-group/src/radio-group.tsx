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
import { useRadioGroup } from "@flt-ui/react-use-radio-group";
import { createRadioScope } from "@flt-ui/react-radio";
import { createContextScope } from "@flt-ui/react-context-scope";
import { Primitive } from "@flt-ui/react-primitive";
import { useDirection } from "@flt-ui/react-direction";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { createCollection, isBoth } from "@flt-ui/react-collection";
import { useFocusIntent } from "@flt-ui/react-use-focus-intent";
import { useComposedEvent } from "@flt-ui/react-use-event";
import { useFocusWithin } from "@flt-ui/react-use-focus-within";
import { focusElement } from "@flt-ui/a11y";

import type { Scope, ScopeHook } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";
import type { These } from "@flt-ui/react-collection";

const OWNER_NAME = "RadioGroup";
const RADIO_GROUP_KEYS = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

type ScopedProps<P> = P & {
  __scopeRadioGroup?: Scope;
};

type ItemData = {
  value: string;
};

const [Collection, useCollection, createCollectionScope] =
  createCollection<ItemData>(OWNER_NAME);

const [createRadioGroupContext, createRadioGroupScope] = createContextScope(
  OWNER_NAME,
  [createRadioScope, createCollectionScope],
);

const useRadioScope: ScopeHook = createRadioScope();

type FC<P> = (props: P) => React.ReactNode;

type RadioGroupProps = RadioGroupImplProps;

type RadioGroupFC = FC<RadioGroupProps> & {
  __ownerName?: string;
};

function createRadioGroup(ownerName: string): RadioGroupFC {
  const RadioGroupImpl: RadioGroupImplFC = createRadioGroupImpl(ownerName);

  const RadioGroup = ((
    props: ScopedProps<RadioGroupProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    return (
      <Collection.Provider scope={props.__scopeRadioGroup}>
        <RadioGroupImpl {...rest} ref={ref} />
      </Collection.Provider>
    );
  }) as RadioGroupFC;

  RadioGroup.__ownerName = ownerName;

  return RadioGroup;
}

/**
 * RadioGroupImpl
 */
type RadioGroupContextValue = {
  value: string | null;
  onValueChange: (value: string | null) => void;
  disabled: true | undefined;
  required: boolean;
  name: string | undefined;
  form: string | undefined;
};

const [RadioGroupImplContext, useRadioGroupContext] =
  createRadioGroupContext<RadioGroupContextValue>(OWNER_NAME);

/**
 * FocusableContext
 */
type FocusableContextValue = {
  focusableValue: string | null;
  onFocusableValueChange: (focusableValue: string | null) => void;
};

const [FocusableContext, useFocusableContext] =
  createRadioGroupContext<FocusableContextValue>(OWNER_NAME);

type RadioGroupImplProps = Omit<
  PrimitiveProps<"div">,
  "defaultValue" | "dir"
> & {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  loop?: boolean;
};

type RadioGroupImplFC = FC<RadioGroupImplProps> & {
  __ownerName?: string;
};

function createRadioGroupImpl(ownerName: string): RadioGroupImplFC {
  const RadioGroupImpl = ((
    props: ScopedProps<RadioGroupImplProps>,
  ): React.JSX.Element => {
    let {
      ref,
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      disabled: _disabled = false,
      required = false,
      name,
      form,
      orientation,
      dir,
      loop = true,
      ...rest
    } = props;

    let { value, onValueChange } = useRadioGroup({
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      caller: ownerName,
    });

    let node = React.useRef<globalThis.HTMLDivElement | null>(null);
    let composedRefs = useComposedRefs(ref, node);
    let direction = useDirection(dir);
    let disabled = _disabled || undefined;

    let [focusableValue, setFocusableValue] = React.useState<string | null>(
      null,
    );

    let focusIntent = useFocusIntent(direction, orientation);
    let fromCollection = useCollection(props.__scopeRadioGroup);

    let { onFocus, onBlur } = useFocusWithin({
      onFocusWithin: (): void => {
        return /** UNUSED */;
      },

      onBlurWithin: (): void => {
        if (value != null) {
          return void 0;
        }

        setFocusableValue(null);

        return /** UNUSED */;
      },
    });

    const handleKeyDown = useComposedEvent(props.onKeyDown, (event): void => {
      let { key } = event;

      if (disabled || !RADIO_GROUP_KEYS.includes(key)) {
        return /** UNUSED */;
      }

      let intent = focusIntent.getFocusIntent(key);

      if (intent === undefined) {
        return /** UNUSED */;
      }

      let next: These<ItemData, globalThis.Node | null>;

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
      onValueChange(next.left.value);

      return /** UNUSED */;
    });

    const handleFocus = useComposedEvent(props.onFocus, onFocus);

    const handleBlur = useComposedEvent(props.onBlur, onBlur);

    return (
      <RadioGroupImplContext.Provider
        scope={props.__scopeRadioGroup}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
        name={name}
        form={form}
      >
        <FocusableContext.Provider
          scope={props.__scopeRadioGroup}
          focusableValue={focusableValue}
          onFocusableValueChange={setFocusableValue}
        >
          <Collection.Slot scope={props.__scopeRadioGroup}>
            <Primitive.div
              {...rest}
              ref={composedRefs}
              role="radiogroup"
              aria-required={required}
              aria-orientation={orientation}
              data-flt-disabled={disabled}
              dir={dir}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Collection.Slot>
        </FocusableContext.Provider>
      </RadioGroupImplContext.Provider>
    );
  }) as RadioGroupImplFC;

  RadioGroupImpl.__ownerName = ownerName;

  return RadioGroupImpl;
}

const RadioGroup: RadioGroupFC = createRadioGroup(OWNER_NAME);

export { RadioGroup, RadioGroup as Root };
export type { RadioGroupProps };

export { createRadioGroup };
export type { RadioGroupFC };

export { createRadioGroupContext, createRadioGroupScope };

export { useRadioScope, useRadioGroupContext, useFocusableContext };

export { Collection };
export { useCollection };

export type { ItemData };
