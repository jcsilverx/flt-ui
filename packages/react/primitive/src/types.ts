import type * as React from "react";
// This file contains some utility types for our own covenience.

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Exclude<T, U> = T extends U ? never : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type Omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]?: T[P];
};

type PropsOf<E extends React.ElementType> = React.ComponentPropsWithRef<E>;

type RefOf<E extends React.ElementType> = React.ComponentRef<E>;

export type { Pick, Exclude, Omit, AnyOmit, PropsOf, RefOf };
