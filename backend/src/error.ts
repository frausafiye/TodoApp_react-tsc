class ErrorMiddleware extends Error {
  constructor(public message: string, public status?: number) {
    super(message);
    if (status !== undefined) {
      this.status = status;
    }
    this.message = message;
  }
}

export default ErrorMiddleware;
