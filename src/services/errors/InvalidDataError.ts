export class InvalidDataError implements Error {
  name: string;
  message: string;

  constructor() {
    this.name = "Invalid data error";
    this.message = "Invalid data returned from HTTPClient";
  }
}