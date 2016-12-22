import { observer } from 'binary-common-utils/lib/observer'

export class CustomError {
  constructor(message) {
    this.error = Error(message)
    this.name = 'GenericError'
  }
  emit() {
    this.error.name = this.name
    observer.emit(this.name, this.error)
    throw this.error
  }
}

export class BlocklyError extends CustomError {
  constructor(message) {
    super(message)
    this.name = 'BlocklyError'
  }
}

export class RuntimeError extends CustomError {
  constructor(message) {
    super(message)
    this.name = 'RuntimeError'
  }
}
