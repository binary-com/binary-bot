export class CustomError {
  constructor(...args) {
    this.error = Error(...args);
    this.name = 'GenericError';
  }
  emit() {
    this.error.name = this.name;
    throw this.error;
  }
}

export class BlocklyError extends CustomError {
  constructor(...args) {
    super(...args);
    this.name = 'BlocklyError';
  }
}

export class RuntimeError extends CustomError {
  constructor(...args) {
    super(...args);
    this.name = 'RuntimeError';
  }
}
