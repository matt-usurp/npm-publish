import type { ActionExecuteFunction } from './action';
import { ExecutionError } from './command/error';

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
