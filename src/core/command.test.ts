import { fn } from '@matt-usurp/grok/testing';
import type { ActionExecuteFunction } from './action';
import { compose, execute } from './command';

describe('compose()', (): void => {
  it('with command specification, can generate command string', (): void => {
    expect(
      compose({
        command: 'npm version',
      }),
    ).toStrictEqual<string>('npm version');
  });

  it('with command specification, with arguments, can generate command string', (): void => {
    expect(
      compose({
        command: 'npm version',

        arguments: [
          '--force',
          '--allow-same-version',
          '--no-git-tag-version',
        ],
      }),
    ).toStrictEqual<string>('npm version --force --allow-same-version --no-git-tag-version');
  });
});

describe('execute()', (): void => {
  it('with command, completes with 0 status code, return', async (): Promise<void> => {
    const mockExecute = fn<ActionExecuteFunction>();

    mockExecute.mockResolvedValueOnce(0);

    try {
      await execute(mockExecute, {
        command: 'something',
      });
    } catch (error: unknown) {
      expect(false).toStrictEqual(false);

      return;
    }

    expect(true).toStrictEqual(true);
  });

  it('with command, completes with non-0 status code, return', async (): Promise<void> => {
    const mockExecute = fn<ActionExecuteFunction>();

    mockExecute.mockResolvedValueOnce(2);

    try {
      await execute(mockExecute, {
        command: 'something',
      });
    } catch (error: unknown) {
      expect((error as Error).message).toStrictEqual('A command returned a non-zero exit code and therefore is assumed to have failed. Please investigate the logs and raise an issue if there seems to be something incorrect.');

      return;
    }

    expect(false).toStrictEqual(true);
  });
});
