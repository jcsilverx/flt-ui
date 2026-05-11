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

import {
  getActiveElement,
  getOwnerDocument,
  contains,
  NODE_FILTER,
} from "@flt-ui/dom";

import { ComposedTreeWalker } from "./composed-tree-walker";
import { focusElement } from "./focus-element";

type FocusManagerOptions = {
  accept?: (node: globalThis.Node) => boolean;
};

type Options = {
  from?: globalThis.Element;
  loop?: boolean;
};

class FocusManager {
  private _container: globalThis.Element;
  private _options: FocusManagerOptions;

  constructor(
    container: globalThis.Element,
    options: globalThis.Partial<FocusManagerOptions> = {},
  ) {
    this._container = container;
    this._options = options;
  }

  public focusFirst(): globalThis.Node | null {
    let walker = new ComposedTreeWalker(
      this._container,
      NODE_FILTER.SHOW_ELEMENT,
      {
        acceptNode: (node): number => {
          if (this._options.accept?.(node)) {
            return NODE_FILTER.FILTER_ACCEPT;
          }

          return NODE_FILTER.FILTER_SKIP;
        },
      },
    );

    let nextNode: globalThis.Node | null = walker.nextNode();

    this.focus(nextNode);

    return nextNode;
  }

  public focusPrevious(
    options: globalThis.Partial<Options> = {},
  ): globalThis.Node | null {
    let ownerDocument = getOwnerDocument(this._container);

    let current = options.from ?? getActiveElement(ownerDocument);

    let walker = new ComposedTreeWalker(
      this._container,
      NODE_FILTER.SHOW_ELEMENT,
      {
        acceptNode: (node): number => {
          if (this._options.accept?.(node)) {
            return NODE_FILTER.FILTER_ACCEPT;
          }

          return NODE_FILTER.FILTER_SKIP;
        },
      },
    );

    if (current != null && contains(this._container, current)) {
      walker.currentNode = current;
    }

    let previousNode: globalThis.Node | null = walker.previousNode();

    if (previousNode == null && options.loop != null && options.loop) {
      walker.currentNode = this._container;

      let lastNode: globalThis.Node | null = null;
      let nextNode: globalThis.Node | null = null;

      do {
        lastNode = walker.lastChild();

        if (lastNode != null) {
          nextNode = lastNode;
        }
      } while (lastNode != null);

      previousNode = nextNode;
    }

    this.focus(previousNode);

    return previousNode;
  }

  public focusNext(
    options: globalThis.Partial<Options> = {},
  ): globalThis.Node | null {
    let ownerDocument = getOwnerDocument(this._container);

    let current = options.from ?? getActiveElement(ownerDocument);

    let walker = new ComposedTreeWalker(
      this._container,
      NODE_FILTER.SHOW_ELEMENT,
      {
        acceptNode: (node): number => {
          if (this._options.accept?.(node)) {
            return NODE_FILTER.FILTER_ACCEPT;
          }

          return NODE_FILTER.FILTER_SKIP;
        },
      },
    );

    if (current != null && contains(this._container, current)) {
      walker.currentNode = current;
    }

    let nextNode: globalThis.Node | null = walker.nextNode();

    if (nextNode == null && options.loop != null && options.loop) {
      walker.currentNode = this._container;

      nextNode = walker.nextNode();
    }

    this.focus(nextNode);

    return nextNode;
  }

  public focusLast(): globalThis.Node | null {
    let walker = new ComposedTreeWalker(
      this._container,
      NODE_FILTER.SHOW_ELEMENT,
      {
        acceptNode: (node): number => {
          if (this._options.accept?.(node)) {
            return NODE_FILTER.FILTER_ACCEPT;
          }

          return NODE_FILTER.FILTER_SKIP;
        },
      },
    );

    let lastNode: globalThis.Node | null = null;
    let nextNode: globalThis.Node | null = null;

    do {
      lastNode = walker.lastChild();

      if (lastNode != null) {
        nextNode = lastNode;
      }
    } while (lastNode != null);

    this.focus(nextNode);

    return nextNode;
  }

  private focus(node: globalThis.Node | null): void {
    if (node != null) {
      focusElement(node, {
        preventScroll: true,
      });
    }

    return /** UNUSED */;
  }
}

export { FocusManager };
export type { FocusManagerOptions };
