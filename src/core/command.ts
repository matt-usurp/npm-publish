import { ActionExecuteFunction } from './action';

/**
 * Execution options for {@link Command}.
 */
export type CommandOptions = {
  readonly cwd?: string;
  readonly silent?: boolean;
};

/**
 * An object representation of a command to be ran.
 */
export type Command = {
  readonly command: string;
  readonly arguments?: string[];
  readonly options?: CommandOptions;
};

/**
 * Compose a command that will be executed.
 */
export const compose = (command: Command): string => {
  return [
    command.command,
    command?.arguments?.join(' ') ?? [],
  ].join(' ').trim();
};

/**
 * Execute a compose {@link command} in the build environment.
 */
export const execute = async (execute: ActionExecuteFunction, command: Command): Promise<void> => {
  const code = await execute(
    command.command,
    command.arguments,
    command.options,
  );

  if (code === 0) {
    return;
  }

  throw new ExecutionError(command);
};

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
