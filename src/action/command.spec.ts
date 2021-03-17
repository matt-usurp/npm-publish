import { Command, compose, ExecutionError, publish, version } from './command';
import { PublishAccess } from './options';

describe('src/action/command.ts', (): void => {
  describe('version()', (): void => {
    it('can build version command, with basic arguments', (): void => {
      const expected: Command = {
        command: 'npm version',
        arguments: [
          '1.0',
          '--force',
          '--allow-same-version',
          '--no-git-tag-version',
        ],
        options: {
          cwd: undefined,
          env: undefined,
          silent: false,
        },
      };

      expect(
        version({
          version: '1.0',
          token: 'some-token',
          directory: undefined,
          tag: '',
          access: PublishAccess.Public,
          silent: false,
          execute: false,
        })
      ).toStrictEqual(expected);
    });

    it('can build version command, with silenced flag', (): void => {
      const expected: Command = {
        command: 'npm version',
        arguments: [
          '2.3',
          '--force',
          '--allow-same-version',
          '--no-git-tag-version',
        ],
        options: {
          cwd: undefined,
          env: undefined,
          silent: true,
        },
      };

      expect(
        version({
          version: '2.3',
          token: 'some-token',
          directory: undefined,
          tag: '',
          access: PublishAccess.Public,
          silent: true,
          execute: false,
        })
      ).toStrictEqual(expected);
    });
  });

  describe('publish()', (): void => {
    it('can build publish command, with basic arguments', (): void => {
      const expected: Command = {
        command: 'npm publish',
        arguments: [
          '--access', 'public',
          '--tag', 'latest',
        ],
        options: {
          cwd: undefined,
          env: {
            'NODE_AUTH_TOKEN': 'some-token',
          },
          silent: false,
        },
      };

      expect(
        publish({
          version: '1.0',
          token: 'some-token',
          directory: undefined,
          tag: 'latest',
          access: PublishAccess.Public,
          silent: false,
          execute: true,
        })
      ).toStrictEqual(expected);
    });

    it('can build publish command, with directory argument provided', (): void => {
      const expected: Command = {
        command: 'npm publish',
        arguments: [
          '--access', 'public',
          '--tag', 'latest',
        ],
        options: {
          cwd: 'build/workspace',
          env: {
            'NODE_AUTH_TOKEN': 'some-token',
          },
          silent: false,
        },
      };

      expect(
        publish({
          version: '1.0',
          token: 'some-token',
          directory: 'build/workspace',
          tag: 'latest',
          access: PublishAccess.Public,
          silent: false,
          execute: true,
        })
      ).toStrictEqual(expected);
    });

    it('can build publish command, with dry-run flag', (): void => {
      const expected: Command = {
        command: 'npm publish',
        arguments: [
          '--access', 'public',
          '--tag', 'latest',
          '--dry-run',
        ],
        options: {
          cwd: undefined,
          env: {
            'NODE_AUTH_TOKEN': 'some-token',
          },
          silent: false,
        },
      };

      expect(
        publish({
          version: '1.0',
          token: 'some-token',
          directory: undefined,
          tag: 'latest',
          access: PublishAccess.Public,
          silent: false,
          execute: false,
        })
      ).toStrictEqual(expected);
    });

    it('can build publish command, with silent flag', (): void => {
      const expected: Command = {
        command: 'npm publish',
        arguments: [
          '--access', 'public',
          '--tag', 'latest',
        ],
        options: {
          cwd: undefined,
          env: {
            'NODE_AUTH_TOKEN': 'some-token',
          },
          silent: true,
        },
      };

      expect(
        publish({
          version: '1.0',
          token: 'some-token',
          directory: undefined,
          tag: 'latest',
          access: PublishAccess.Public,
          silent: true,
          execute: true,
        })
      ).toStrictEqual(expected);
    });

    it('can build publish command, with distribution tag', (): void => {
      const expected: Command = {
        command: 'npm publish',
        arguments: [
          '--access', 'public',
          '--tag', 'beta',
        ],
        options: {
          cwd: undefined,
          env: {
            'NODE_AUTH_TOKEN': 'some-token',
          },
          silent: false,
        },
      };

      expect(
        publish({
          version: '1.0',
          token: 'some-token',
          directory: undefined,
          tag: 'beta',
          access: PublishAccess.Public,
          silent: false,
          execute: true,
        })
      ).toStrictEqual(expected);
    });

    it('can build publish command, with access private', (): void => {
      const expected: Command = {
        command: 'npm publish',
        arguments: [
          '--access', 'private',
          '--tag', 'latest',
        ],
        options: {
          cwd: undefined,
          env: {
            'NODE_AUTH_TOKEN': 'some-token',
          },
          silent: false,
        },
      };

      expect(
        publish({
          version: '1.0',
          token: 'some-token',
          directory: undefined,
          tag: 'latest',
          access: PublishAccess.Private,
          silent: false,
          execute: true,
        })
      ).toStrictEqual(expected);
    });
  });

  describe('compose()', (): void => {
    it('can compose string from command, version', (): void => {
      expect(
        compose({
          command: 'npm version',
          arguments: [
            '--force',
            '--allow-same-version',
            '--no-git-tag-version',
          ],
          options: {
            cwd: undefined,
            env: undefined,
            silent: false,
          },
        })
      ).toStrictEqual('npm version --force --allow-same-version --no-git-tag-version');
    });

    it('can compose string from command, publish', (): void => {
      expect(
        compose({
          command: 'npm publish',
          arguments: [
            '--access', 'private',
            '--tag', 'latest',
          ],
          options: {
            cwd: undefined,
            env: undefined,
            silent: false,
          },
        })
      ).toStrictEqual('npm publish --access private --tag latest');
    });
  });

  describe('ExecutionError', (): void => {
    it('can convert to string', (): void => {
      const error = new ExecutionError({
        command: 'npm publish',
        arguments: [
          '--access', 'private',
          '--tag', 'latest',
        ],
        options: {
          cwd: undefined,
          env: undefined,
          silent: false,
        },
      });

      expect(error.toString()).toStrictEqual(
        `
An execution error occurred whilst executing a command:
A command returned a non-zero exit code and therefore is assumed to have failed. Please investigate the logs and raise an issue if there seems to be something incorrect.

The command in question:
> npm publish --access private --tag latest
        `.trim()
      );
    });
  });
});
