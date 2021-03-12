import { getInput as input, setFailed as fail, setOutput as output, info } from '@actions/core';
import { execute, publish, version } from './action/command';
import { normalise } from './action/options';

const colours = {
  reset: '\u001b[0m',
  header: '\u001b[36m',
  value: '\u001b[32m',
  symbol: '\u001b[33m',
};

const header = (message: string): string => {
  return `${colours.symbol}:> ${colours.header}${message}${colours.reset}`;
};

const keypair = (key: string, value: string): string => {
  return `${colours.reset}${key}: ${colours.value}${value}${colours.reset}`;
};

export async function main(): Promise<void> {
  try {
    info(header('Welcome to the NPM publish pacage action!'));

    const options = normalise({
      version: input('version', { required: true }),
      directory: input('directory'),
      tag: input('tag'),
      private: input('private'),
      silent: input('silent'),
      execute: input('execute'),
    });

    info(header('Resolved options:'));
    info(keypair('version', options.version));
    info(keypair('access', options.access));
    info(keypair('distribution', options.tag));
    info(keypair('execute', options.execute ? 'true' : 'false'));
    info(keypair('silent', options.execute ? 'true' : 'false'));

    info(header('Version update'));
    await execute(options, version(options));

    info(header('Publish package'));
    await execute(options, publish(options));

    info(header('Done!'));

    output('version', options.version);
  } catch (error) {
    fail(error);
  }
}

main();
