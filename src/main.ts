import { getInput as input, setFailed as fail, setOutput as output, info } from '@actions/core';
import { execute, publish, version } from './action/command';
import { LoggerFunction } from './action/logger';
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

export async function main(logger: LoggerFunction | undefined): Promise<void> {
  try {
    let print = logger;

    const options = normalise({
      version: input('version', { required: true }),
      directory: input('directory'),
      tag: input('tag'),
      private: input('private'),
      silent: input('silent'),
      execute: input('execute'),
    });

    if (options.silent === true || print === undefined) {
      print = () => {
        return;
      };
    }

    print(header('Action options'));
    print(keypair('version', options.version));
    print(keypair('directory', options.directory ?? '.'));
    print(keypair('access', options.access));
    print(keypair('distribution', options.tag));
    print(keypair('execute', options.execute ? 'true' : 'false'));
    print(keypair('silent', options.execute ? 'true' : 'false'));

    print(header('Executing version update'));
    await execute(print, options, version(options));

    print(header('Executig package publication'));
    await execute(print, options, publish(options));

    print(header('Action complete!'));

    output('version', options.version);
  } catch (error) {
    fail(error);
  }
}

main(info);
