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

import * as ZRNG from "@zphyrx/token-rc1";

type UIDString = `${string}-\u00AB${string}\u00BB`;

class UID {
  private _prefix: string;
  private _token: ZRNG.Token;

  constructor(prefix: string) {
    this._prefix = prefix;
    this._token = new ZRNG.Token();
  }

  public random(min = 3, max = 10): UIDString {
    let len = this.randint(min, max);

    return this.format(this._token.random(len));
  }

  private format(uid: string): UIDString {
    return `${this._prefix}-\u00AB${uid}\u00BB`;
  }

  private randint(min: number, max: number): number {
    let Math = globalThis.Math;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export { UID };
export type { UIDString };
