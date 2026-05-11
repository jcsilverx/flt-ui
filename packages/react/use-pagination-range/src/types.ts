type PaginationItem = {
  /**
   * The type of the pagination item.
   */
  readonly type: "ellipsis" | "first" | "last" | "prev" | "next" | "page";
  /**
   * Indicates whether this pagination item is active.
   */
  readonly active: boolean;
  /**
   * The value of the pagination item.
   */
  readonly value: number;
};

export type { PaginationItem };
