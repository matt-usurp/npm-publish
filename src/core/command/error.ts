import type { Command } from '../command';
import { compose } from '../command';

/**
 * A custom exection error that is thrown from {@link execute()}.
 */
export class ExecutionError extends Error {
  public readonly command: Command;

  /**
   * {@inheritdoc}
   */
  public constructor(command: Command) {
    super([
      'A command returned a non-zero exit code and therefore is assumed to have failed.',
      'Please investigate the logs and raise an issue if there seems to be something incorrect.',
    ].join(' '));

    this.command = command;
  }

  /**
   * {@inheritdoc}
   */
  public toString(): string {
    return `
An execution error occurred whilst executing a command:
${this.message}

The command in question:
> ${compose(this.command)}
    `.trim();
  }
}
