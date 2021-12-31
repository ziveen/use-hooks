export interface BaseAPI<T> {
  msg: string;
  code: string | number;
  payload: T;
}
