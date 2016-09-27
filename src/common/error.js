export class CustomError {
  constructor(...args) {
    const template = Error(...args);
    this.name = 'GenericError';
    this.message = template.message;
    this.stack = template.stack;
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
