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

class UniqueDeque<T> {
  private _items: T[];

  constructor() {
    this._items = [];
  }

  public push_front(val: T): void {
    let idx = this._items.indexOf(val);

    if (idx !== -1) {
      this._items.splice(idx, 1);
    }

    this._items.unshift(val);
    return /** UNUSED */;
  }

  public push_back(val: T): void {
    let idx = this._items.indexOf(val);

    if (idx !== -1) {
      this._items.splice(idx, 1);
    }

    this._items.push(val);
    return /** UNUSED */;
  }

  public pop_front(): void {
    this._items.shift();
    return /** UNUSED */;
  }

  public pop_back(): void {
    this._items.pop();
    return /** UNUSED */;
  }

  public remove(val: T): void {
    let idx = this._items.indexOf(val);

    if (idx !== -1) {
      this._items.splice(idx, 1);
    }

    return /** UNUSED */;
  }

  public front(): T {
    return this._items[0];
  }

  public back(): T {
    return this._items[this._items.length - 1];
  }
}

export { UniqueDeque };
