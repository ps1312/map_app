export class HTTPClientResponse {
  statusCode: number;
  body: any;

  constructor(statusCode: number, body: any) {
    this.statusCode = statusCode
    this.body = body
  }
}

export type HTTPClientResult = HTTPClientResponse | Error

export interface HTTPClient {
  post(url: URL, params: Object): Promise<HTTPClientResult>;
  get(url: URL): Promise<HTTPClientResult>
}