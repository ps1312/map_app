export type HTTPClientResponse = number | Error

export interface HTTPClient<T> {
  get(url: URL, params: T): Promise<HTTPClientResponse>;
}