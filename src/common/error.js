export class BlocklyError extends Error {
  constructor(args) {
    super(args);
    this.name = 'BlocklyError';
  }
}
