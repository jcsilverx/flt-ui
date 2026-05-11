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

import { NODE_FILTER } from "./constants";
import { isShadowRoot } from "./is-shadow-root";
import { traverse } from "./traverse";

type ACCEPT_NODE = (node: globalThis.Node) => number;

class ShadowDomTreeWalker {
  public readonly filter: {
    acceptNode: ACCEPT_NODE;
  } | null = null;
  public readonly root: globalThis.Node;
  public readonly whatToShow: number;

  private _currentNode: globalThis.Node;

  constructor(
    root: globalThis.Node,
    whatToShow?: number,
    filter?: {
      acceptNode: ACCEPT_NODE;
    } | null,
  ) {
    this.filter = filter ?? null;
    this.root = root;
    this.whatToShow = whatToShow ?? NODE_FILTER.SHOW_ALL;

    this._currentNode = root;
  }

  public get currentNode(): globalThis.Node {
    return this._currentNode;
  }

  public set currentNode(node: globalThis.Node) {
    this._currentNode = node;

    return;
  }

  public parentNode(): globalThis.Node | null {
    let node: globalThis.Node | null = this._currentNode;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (node != null && node !== this.root) {
      if (isShadowRoot(node)) {
        node = node.host;
      } else {
        node = node.parentNode;
      }

      if (node == null || node === this.root) {
        return null;
      }

      let result = traverse(
        {
          active: false,
          whatToShow: this.whatToShow,
          filter: this.filter,
        },
        node,
      );

      if (result === NODE_FILTER.FILTER_ACCEPT) {
        this._currentNode = node;

        return node;
      }
    }

    return null;
  }

  public firstChild(): globalThis.Node | null {
    return this.traverseChildren("FIRST");
  }

  public previousSibling(): globalThis.Node | null {
    return this.traverseSiblings("PREVIOUS");
  }

  public nextSibling(): globalThis.Node | null {
    return this.traverseSiblings("NEXT");
  }

  public lastChild(): globalThis.Node | null {
    return this.traverseChildren("LAST");
  }

  public previousNode(): globalThis.Node | null {
    let node: globalThis.Node | null = this._currentNode;

    while (node !== this.root) {
      let sibling: globalThis.Node | null = node.previousSibling;

      while (sibling != null) {
        node = sibling;

        let result = traverse(
          {
            active: false,
            whatToShow: this.whatToShow,
            filter: this.filter,
          },
          node,
        );

        while (result !== NODE_FILTER.FILTER_REJECT) {
          let child: globalThis.Node | null = null;

          if (
            node instanceof globalThis.HTMLElement &&
            node.shadowRoot != null &&
            node.shadowRoot !== this.root
          ) {
            child = node.shadowRoot.lastChild;
          } else {
            child = node.lastChild;
          }

          if (child == null) {
            break;
          }

          node = child;

          result = traverse(
            {
              active: false,
              whatToShow: this.whatToShow,
              filter: this.filter,
            },
            node,
          );
        }

        if (result === NODE_FILTER.FILTER_ACCEPT) {
          this._currentNode = node;

          return node;
        }

        sibling = node.previousSibling;
      }

      let parent: globalThis.Node | null = null;

      if (isShadowRoot(node)) {
        parent = node.host;
      } else {
        parent = node.parentNode;
      }

      if (parent == this.root || parent === null) {
        return null;
      }

      node = parent;

      let result = traverse(
        {
          active: false,
          whatToShow: this.whatToShow,
          filter: this.filter,
        },
        node,
      );

      if (result === NODE_FILTER.FILTER_ACCEPT) {
        this.currentNode = node;

        return node;
      }
    }

    return null;
  }

  public nextNode(): globalThis.Node | null {
    let node: globalThis.Node | null = this._currentNode;
    let result: number = NODE_FILTER.FILTER_ACCEPT;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      while (result !== NODE_FILTER.FILTER_REJECT) {
        let child: globalThis.Node | null = null;

        if (
          node instanceof globalThis.HTMLElement &&
          node.shadowRoot != null &&
          node.shadowRoot !== this.root
        ) {
          child = node.shadowRoot.firstChild;
        } else {
          child = node.firstChild;
        }

        if (child == null) {
          break;
        }

        node = child;

        result = traverse(
          {
            active: false,
            whatToShow: this.whatToShow,
            filter: this.filter,
          },
          node,
        );

        if (result === NODE_FILTER.FILTER_ACCEPT) {
          this._currentNode = node;

          return node;
        }
      }

      let sibling: globalThis.Node | null = null;
      let temporary: globalThis.Node | null = node;

      while (temporary != null) {
        let parent: globalThis.Node | null = null;

        if (isShadowRoot(temporary)) {
          parent = temporary.host;
        } else {
          parent = temporary.parentNode;
        }

        if (temporary === this.root) {
          return null;
        }

        sibling = temporary.nextSibling;

        if (sibling != null) {
          node = sibling;

          break;
        }

        temporary = parent;
      }

      if (temporary == null) {
        return null;
      }

      result = traverse(
        {
          active: false,
          whatToShow: this.whatToShow,
          filter: this.filter,
        },
        node,
      );

      if (result === NODE_FILTER.FILTER_ACCEPT) {
        this._currentNode = node;
        return node;
      }
    }
  }

  private traverseChildren(type: "FIRST" | "LAST"): globalThis.Node | null {
    let node: globalThis.Node | null = this._currentNode;

    node = type === "FIRST" ? node.firstChild : node.lastChild;

    while (node != null) {
      let result = traverse(
        {
          active: false,
          whatToShow: this.whatToShow,
          filter: this.filter,
        },
        node,
      );

      if (result === NODE_FILTER.FILTER_ACCEPT) {
        this._currentNode = node;

        return node;
      }

      if (result === NODE_FILTER.FILTER_SKIP) {
        let child: globalThis.Node | null =
          type === "FIRST" ? node.firstChild : node.lastChild;

        if (child != null) {
          node = child;

          continue;
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      while (node != null) {
        let sibling: globalThis.Node | null =
          type === "FIRST" ? node.nextSibling : node.previousSibling;

        if (sibling != null) {
          node = sibling;

          break;
        }

        let parent: globalThis.Node | null = null;

        if (isShadowRoot(node)) {
          parent = node.host;
        } else {
          parent = node.parentNode;
        }

        if (
          parent == null ||
          parent === this.root ||
          parent === this._currentNode
        ) {
          return null;
        }

        node = parent;
      }
    }

    return null;
  }

  private traverseSiblings(type: "NEXT" | "PREVIOUS"): globalThis.Node | null {
    let node: globalThis.Node | null = this._currentNode;

    if (node === this.root) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      let sibling: globalThis.Node | null =
        type === "NEXT" ? node.nextSibling : node.previousSibling;

      while (sibling != null) {
        node = sibling;

        let result = traverse(
          {
            active: false,
            whatToShow: this.whatToShow,
            filter: this.filter,
          },
          node,
        );

        if (result === NODE_FILTER.FILTER_ACCEPT) {
          this._currentNode = node;

          return node;
        }

        sibling = type === "NEXT" ? node.firstChild : node.lastChild;

        if (result === NODE_FILTER.FILTER_REJECT || sibling == null) {
          sibling = type === "NEXT" ? node.nextSibling : node.previousSibling;
        }
      }
      let parent: globalThis.Node | null = node.parentNode;

      if (isShadowRoot(node)) {
        node = node.host;
      } else {
        node = parent;
      }

      if (node == null || node === this.root) {
        return null;
      }

      let result = traverse(
        {
          active: false,
          whatToShow: this.whatToShow,
          filter: this.filter,
        },
        node,
      );

      if (result === NODE_FILTER.FILTER_ACCEPT) {
        return null;
      }
    }
  }
}

export { ShadowDomTreeWalker };
