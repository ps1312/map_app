export class NoConnectivityError implements Error {
  name: string;
  message: string;

  constructor() {
    this.name =  "No connectivity error";
    this.message = "Error trying to access to network";
  }
}
