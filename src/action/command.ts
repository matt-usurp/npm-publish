import { exec, ExecOptions } from '@actions/exec';
import { keypair, LoggerFunction } from './logger';
import { ActionOptions } from './options';

export type CommandOptions = {
  cwd: string | undefined;
  env: Record<string, string> | undefined;
  silent: boolean;
};

export type Command = {
  command: string;
  arguments: string[];
  options: CommandOptions;
};

/**
 * Build the version command to set the package version.
 */
export function version(options: ActionOptions): Command {
  const flags: string[] = [];

  flags.push(options.version);
  flags.push('--force');
  flags.push('--allow-same-version');
  flags.push('--no-git-tag-version');

  return {
    command: 'npm version',
    arguments: flags,
    options: {
      cwd: options.directory,
      env: undefined,
      silent: options.silent,
    },
  };
}

/**
 * Build the publish command to publish the specified version.
 */
export function publish(options: ActionOptions): Command {
  const flags: string[] = [];

  flags.push('--access', options.access);
  flags.push('--tag', options.tag);

  if (options.execute === false) {
    flags.push('--dry-run');
  }

  return {
    command: 'npm publish',
    arguments: flags,
    options: {
      cwd: options.directory,
      env: {
        'NODE_AUTH_TOKEN': options.token,
      },
      silent: options.silent,
    },
  };
}

export function compose(command: Command): string {
  return [
    command.command,
    command.arguments.join(' '),
  ].join(' ');
}

export class ExecutionError extends Error {
  public readonly command: Command;

  public constructor(command: Command) {
    super([
      'A command returned a non-zero exit code and therefore is assumed to have failed.',
      'Please investigate the logs and raise an issue if there seems to be something incorrect.',
    ].join(' '));

    this.command = command;
  }

  public toString(): string {
    return `
An execution error occurred whilst executing a command:
${this.message}

The command in question:
> ${compose(this.command)}
    `.trim();
  }
}

export async function execute(logger: LoggerFunction, command: Command): Promise<void> {
  logger(keypair('command', compose(command)));

  const options: ExecOptions = {
    ...command.options,

    // Merging in the process environment with any additional command environments.
    // Apparently this doesn't merge for us, but instead replace the environment entirely.
    env: {
      ...process.env as Record<string, string>,
      ...command.options.env,
    }
  };

  console.dir(options, { depth: 10 });

  await exec(
    'env',
    [],
    options,
  );

  // const code = await exec(
  //   command.command,
  //   command.arguments,
  //   options,
  // );

  // if (code === 0) {
  //   return;
  // }

  throw new ExecutionError(command);
}
