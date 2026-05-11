import type * as React from "react";

type MC<C = any> = globalThis.Map<string, React.Context<C>>;

type Scope<C = any> = globalThis.Record<string, MC<C>> | undefined;

type ScopeHook = (scope: Scope) => globalThis.Record<string, Scope>;

type CreateUseScope = {
  __scopeName: string;
  (): ScopeHook;
};

type FC<P> = (props: P) => React.ReactNode;

type PrimitiveProps = {
  children: React.ReactNode;
};

type ProviderProps<P> = PrimitiveProps &
  P & {
    scope: Scope<P>;
  };

type ProviderFC<P> = FC<ProviderProps<P>> & {
  __ownerName?: string;
};

type Globals<C> = {
  defaultValue?: C | undefined;
  errorMessage?: string | undefined;
};

type Locals = {
  errorMessage?: string | undefined;
};

type UseContext<C> = {
  (consName: string, scope: Scope<C | undefined>): C;
  (consName: string, scope: Scope<C | undefined>, locals: Locals): C;
};

type Context<C> = {
  readonly Provider: ProviderFC<C>;
};

type CreateContext = {
  <C>(ownerName: string): readonly [Context<C>, UseContext<C>];
  <C>(
    ownerName: string,
    globals: Globals<C>,
  ): readonly [Context<C>, UseContext<C>];
};

export type {
  MC,
  Scope,
  ScopeHook,
  CreateUseScope,
  //
  ProviderProps,
  ProviderFC,
  Globals,
  Locals,
  UseContext,
  Context,
  CreateContext,
};
