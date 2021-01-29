export class NoConnectivityError implements Error {
  name: "No connectivity error";
  message: "Error trying to access to network";
}

export class InvalidDataError implements Error {
  name: "Invalid data error";
  message: "Invalid data returned from HTTPClient";
}