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

import type { These, Left, Right, Both } from "./types";

const isLeft = <E>(a: These<E, unknown>): a is Left<E> => {
  return a._kind === "Left";
};

const isRight = <A>(a: These<unknown, A>): a is Right<A> => {
  return a._kind === "Right";
};

const isBoth = <E, A>(a: These<E, A>): a is Both<E, A> => {
  return a._kind === "Both";
};

const left = <E = never, A = never>(left: E): These<E, A> => {
  return {
    _kind: "Left",
    left,
  };
};

const right = <E = never, A = never>(right: A): These<E, A> => {
  return {
    _kind: "Right",
    right,
  };
};

const both = <E, A>(left: E, right: A): These<E, A> => {
  return {
    _kind: "Both",
    left,
    right,
  };
};

export { isLeft, isRight, isBoth, left, right, both };
