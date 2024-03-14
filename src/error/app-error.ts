class appError extends Error {
  //props
  status: number;
  //constructor
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export { appError };
