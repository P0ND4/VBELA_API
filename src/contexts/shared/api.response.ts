export enum Status {
  Success = 'success',
  Pending = 'pending',
  Denied = 'denied',
  Completed = 'completed',
  Error = 'error',
  Cancelled = 'cancelled',
  InProgress = 'in_progress',
}

export class ApiResponse<T> {
  status: Status;
  message: string;
  code: number;
  data: T;

  constructor(status: Status, code: number, message: string, data: T) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  toJSON() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}
