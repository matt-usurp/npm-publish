import { getInput as input, setFailed as fail, setOutput as output, info } from '@actions/core';
import { execute, publish, version } from './action/command';
import { header, keypair, LoggerFunction } from './action/logger';
import { normalise } from './action/options';

export async function main(logger: LoggerFunction | undefined): Promise<void> {
  try {
    let print = logger;

    const options = normalise({
      version: input('version', { required: true }),
      token: input('token', { required: true }),
      directory: input('directory'),
      tag: input('tag'),
      access: input('private'),
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
    print(keypair('token', `${options.token.substr(0, 4)}********`));
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
