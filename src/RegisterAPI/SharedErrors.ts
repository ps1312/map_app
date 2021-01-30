export class NoConnectivityError implements Error {
  name: string;
  message: string;

  constructor() {
    this.name =  "No connectivity error";
    this.message = "Error trying to access to network";
  }
}

export class InvalidDataError implements Error {
  name: string;
  message: string;

  constructor() {
    this.name = "Invalid data error";
    this.message = "Invalid data returned from HTTPClient";
  }
}