import { observer } from 'binary-common-utils/lib/observer';

export class CustomError {
  constructor(message) {
    this.message = message;
    this.error = Error(message);
    this.name = 'GenericError';
  }
  emit() {
    observer.emit(this.name, this.message);
    this.error.name = this.name;
    throw this.error;
  }
}

export class BlocklyError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'BlocklyError';
  }
}

export class RuntimeError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'RuntimeError';
  }
}
