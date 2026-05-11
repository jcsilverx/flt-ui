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

import { useEvent } from "@flt-ui/react-use-event";
import {
  contains,
  getActiveElement,
  getEventTarget,
  getOwnerDocument,
} from "@flt-ui/dom";

import type * as React from "react";

type FocusWithinProps = {
  onFocusWithin?: (event: React.FocusEvent) => void;
  onBlurWithin?: (event: React.FocusEvent) => void;
};

type FocusWithinReturn = {
  onFocus: (event: React.FocusEvent) => void;
  onBlur: (event: React.FocusEvent) => void;
};

function useFocusWithin(props: FocusWithinProps): FocusWithinReturn {
  let { onFocusWithin, onBlurWithin } = props;

  const onFocus = useEvent((event: React.FocusEvent): void => {
    let { target, currentTarget } = event;

    if (!contains(currentTarget, target)) {
      return;
    }

    let ownerDocument = getOwnerDocument(target);

    let activeElement = getActiveElement(ownerDocument);
    let nativeEventTarget = getEventTarget(event.nativeEvent);

    if (activeElement == null || nativeEventTarget == null) {
      return;
    }

    if (activeElement !== nativeEventTarget) {
      return;
    }

    onFocusWithin?.(event);

    return;
  });

  const onBlur = useEvent((event: React.FocusEvent): void => {
    let { target, currentTarget, relatedTarget } = event;

    if (!contains(currentTarget, target)) {
      return;
    }

    if (contains(currentTarget, relatedTarget)) {
      return;
    }

    onBlurWithin?.(event);

    return;
  });

  return {
    onFocus,
    onBlur,
  };
}

export { useFocusWithin };
export type { FocusWithinProps, FocusWithinReturn };
