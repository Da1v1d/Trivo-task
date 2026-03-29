export type BaseApiResponse<T> = {
  data: T;
};

export type ApiResponse<T> = BaseApiResponse<T>;

export type PaginationResponse<T> = BaseApiResponse<T[]> & {
  total: number;
  page: number;
  limit: number;
};

export type PaginationRequest = {
  page: number;
  limit: number;
};

type Sorting = "asc" | "desc";

export type FilterRequest = Partial<PaginationRequest> &
  Partial<{
    sorting?: Sorting;
    sortBy?: string;
    search?: string;
  }>;
