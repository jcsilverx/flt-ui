type FC<P> = (props: P) => React.ReactNode;

type ProviderProps<P> = P & {
  children: React.ReactNode;
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
  (consName: string): C;
  (consName: string, locals: Locals): C;
};

type Context<C> = {
  readonly Provider: ProviderFC<C>;
};

export type { ProviderProps, ProviderFC, Globals, Locals, UseContext, Context };
