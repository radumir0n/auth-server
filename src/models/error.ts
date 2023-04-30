export class CustomError implements Error {
    name: string;
    message!: string;
    status!: number;
    additionalInfo!: unknown;
  
    constructor(message: string, status = 500, additionalInfo: unknown = {}) {
      this.message = message;
      this.status = status;
      this.additionalInfo = additionalInfo
    }
}
