import { ExecutionError } from './error';

describe(ExecutionError.name, (): void => {
  describe('toString()', (): void => {
    it('with error, can convert to string', (): void => {
      const error = new ExecutionError({
        command: 'npm publish',
        arguments: [
          '--access', 'private',
          '--tag', 'latest',
        ],
      });

      expect(error.toString()).toStrictEqual<string>(
        `
An execution error occurred whilst executing a command:
A command returned a non-zero exit code and therefore is assumed to have failed. Please investigate the logs and raise an issue if there seems to be something incorrect.

The command in question:
> npm publish --access private --tag latest
      `.trim(),
      );
    });
  });
});
