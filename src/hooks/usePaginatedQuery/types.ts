export interface IPaginatedResponse<T = any> {
  count: number;
  page: number;
  perPage: number;
  results: T[];
}
