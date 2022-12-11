import { fn } from '@matt-usurp/grok/testing';
import { action, ActionExecuteFunction, ActionExecuteFunctionOptions, ActionFailFunction, ActionInputFunction, ActionInputFunctionOptions, ActionOutputFunction } from './action';

describe('action()', (): void => {
  it('with invalid input, version, missing, throw error', async (): Promise<void> => {
    const execute = fn<ActionExecuteFunction>();
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce(''); // version
    input.mockReturnValueOnce(''); // access
    input.mockReturnValueOnce(''); // tag
    input.mockReturnValueOnce(''); // execute

    input.mockReturnValueOnce(''); // directory
    input.mockReturnValueOnce(''); // silent

    await action({
      execute,
      input,
      output,
      fail,
    });

    expect(execute).toBeCalledTimes(0);

    expect(input).toBeCalledTimes(1);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });

    expect(output).toBeCalledTimes(0);

    expect(fail).toBeCalledTimes(1);
    expect(fail).toHaveBeenNthCalledWith<[string]>(1, 'An expected error occured: Error: The npm-version must be provided and be a valid semantic version');
  });

  it('with invalid input, version, invalid, throw error', async (): Promise<void> => {
    const execute = fn<ActionExecuteFunction>();
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('v1.2'); // version
    input.mockReturnValueOnce(''); // access
    input.mockReturnValueOnce(''); // tag
    input.mockReturnValueOnce(''); // execute

    input.mockReturnValueOnce(''); // directory
    input.mockReturnValueOnce(''); // dry-run

    await action({
      execute,
      input,
      output,
      fail,
    });

    expect(execute).toBeCalledTimes(0);

    expect(input).toBeCalledTimes(1);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });

    expect(output).toBeCalledTimes(0);

    expect(fail).toBeCalledTimes(1);
    expect(fail).toHaveBeenNthCalledWith<[string]>(1, 'An expected error occured: Error: The npm-version given "v1.2" is not a valid semantic version');
  });

  it('with valid input, execute version and publish, output version', async (): Promise<void> => {
    const execute = fn<ActionExecuteFunction>();
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('2.3.4'); // version
    input.mockReturnValueOnce(''); // access
    input.mockReturnValueOnce(''); // tag
    input.mockReturnValueOnce(''); // dry-run

    input.mockReturnValueOnce(''); // directory
    input.mockReturnValueOnce(''); // silent

    execute.mockResolvedValueOnce(0); // npm version
    execute.mockResolvedValueOnce(0); // npm publish

    await action({
      execute,
      input,
      output,
      fail,
    });

    expect(execute).toBeCalledTimes(2);
    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      1,
      'npm version',
      [
        '2.3.4',
        '--force',
        '--allow-same-version',
        '--no-git-tag-version',
      ],
      {
        cwd: undefined,
        silent: false,
      },
    );

    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      2,
      'npm publish',
      [
        '--access', 'public',
        '--tag', 'latest',
      ],
      {
        cwd: undefined,
        silent: false,
      },
    );

    expect(input).toBeCalledTimes(6);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });
    expect(input).toHaveBeenNthCalledWith<[string]>(2, 'access');
    expect(input).toHaveBeenNthCalledWith<[string]>(3, 'tag');
    expect(input).toHaveBeenNthCalledWith<[string]>(4, 'dry-run');
    expect(input).toHaveBeenNthCalledWith<[string]>(5, 'directory');
    expect(input).toHaveBeenNthCalledWith<[string]>(6, 'silent');

    expect(output).toBeCalledTimes(1);
    expect(output).toHaveBeenNthCalledWith<[string, string]>(1, 'version', '2.3.4');

    expect(fail).toBeCalledTimes(0);
  });

  it('with valid input, with access, execute version and publish, output version', async (): Promise<void> => {
    const execute = fn<ActionExecuteFunction>();
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('2.3.4'); // version
    input.mockReturnValueOnce('private'); // access
    input.mockReturnValueOnce(''); // tag
    input.mockReturnValueOnce(''); // dry-run

    input.mockReturnValueOnce(''); // directory
    input.mockReturnValueOnce(''); // silent

    execute.mockResolvedValueOnce(0); // npm version
    execute.mockResolvedValueOnce(0); // npm publish

    await action({
      execute,
      input,
      output,
      fail,
    });

    expect(execute).toBeCalledTimes(2);
    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      1,
      'npm version',
      [
        '2.3.4',
        '--force',
        '--allow-same-version',
        '--no-git-tag-version',
      ],
      {
        cwd: undefined,
        silent: false,
      },
    );

    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      2,
      'npm publish',
      [
        '--access', 'private',
        '--tag', 'latest',
      ],
      {
        cwd: undefined,
        silent: false,
      },
    );

    expect(input).toBeCalledTimes(6);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });
    expect(input).toHaveBeenNthCalledWith<[string]>(2, 'access');
    expect(input).toHaveBeenNthCalledWith<[string]>(3, 'tag');
    expect(input).toHaveBeenNthCalledWith<[string]>(4, 'dry-run');
    expect(input).toHaveBeenNthCalledWith<[string]>(5, 'directory');
    expect(input).toHaveBeenNthCalledWith<[string]>(6, 'silent');

    expect(output).toBeCalledTimes(1);
    expect(output).toHaveBeenNthCalledWith<[string, string]>(1, 'version', '2.3.4');

    expect(fail).toBeCalledTimes(0);
  });

  it('with valid input, with tag, execute version and publish, output version', async (): Promise<void> => {
    const execute = fn<ActionExecuteFunction>();
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('2.3.4'); // version
    input.mockReturnValueOnce(''); // access
    input.mockReturnValueOnce('next'); // tag
    input.mockReturnValueOnce(''); // dry-run

    input.mockReturnValueOnce(''); // directory
    input.mockReturnValueOnce(''); // silent

    execute.mockResolvedValueOnce(0); // npm version
    execute.mockResolvedValueOnce(0); // npm publish

    await action({
      execute,
      input,
      output,
      fail,
    });

    expect(execute).toBeCalledTimes(2);
    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      1,
      'npm version',
      [
        '2.3.4',
        '--force',
        '--allow-same-version',
        '--no-git-tag-version',
      ],
      {
        cwd: undefined,
        silent: false,
      },
    );

    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      2,
      'npm publish',
      [
        '--access', 'public',
        '--tag', 'next',
      ],
      {
        cwd: undefined,
        silent: false,
      },
    );

    expect(input).toBeCalledTimes(6);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });
    expect(input).toHaveBeenNthCalledWith<[string]>(2, 'access');
    expect(input).toHaveBeenNthCalledWith<[string]>(3, 'tag');
    expect(input).toHaveBeenNthCalledWith<[string]>(4, 'dry-run');
    expect(input).toHaveBeenNthCalledWith<[string]>(5, 'directory');
    expect(input).toHaveBeenNthCalledWith<[string]>(6, 'silent');

    expect(output).toBeCalledTimes(1);
    expect(output).toHaveBeenNthCalledWith<[string, string]>(1, 'version', '2.3.4');

    expect(fail).toBeCalledTimes(0);
  });

  it('with valid input, with execute, execute version and publish, output version', async (): Promise<void> => {
    const execute = fn<ActionExecuteFunction>();
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('2.3.4'); // version
    input.mockReturnValueOnce(''); // access
    input.mockReturnValueOnce(''); // tag
    input.mockReturnValueOnce('true'); // dry-run

    input.mockReturnValueOnce(''); // directory
    input.mockReturnValueOnce(''); // silent

    execute.mockResolvedValueOnce(0); // npm version
    execute.mockResolvedValueOnce(0); // npm publish

    await action({
      execute,
      input,
      output,
      fail,
    });

    expect(execute).toBeCalledTimes(2);
    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      1,
      'npm version',
      [
        '2.3.4',
        '--force',
        '--allow-same-version',
        '--no-git-tag-version',
      ],
      {
        cwd: undefined,
        silent: false,
      },
    );

    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      2,
      'npm publish',
      [
        '--access', 'public',
        '--tag', 'latest',
        '--dry-run',
      ],
      {
        cwd: undefined,
        silent: false,
      },
    );

    expect(input).toBeCalledTimes(6);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });
    expect(input).toHaveBeenNthCalledWith<[string]>(2, 'access');
    expect(input).toHaveBeenNthCalledWith<[string]>(3, 'tag');
    expect(input).toHaveBeenNthCalledWith<[string]>(4, 'dry-run');
    expect(input).toHaveBeenNthCalledWith<[string]>(5, 'directory');
    expect(input).toHaveBeenNthCalledWith<[string]>(6, 'silent');

    expect(output).toBeCalledTimes(1);
    expect(output).toHaveBeenNthCalledWith<[string, string]>(1, 'version', '2.3.4');

    expect(fail).toBeCalledTimes(0);
  });

  it('with valid input, with directory, execute version and publish, output version', async (): Promise<void> => {
    const execute = fn<ActionExecuteFunction>();
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('2.3.4'); // version
    input.mockReturnValueOnce(''); // access
    input.mockReturnValueOnce(''); // tag
    input.mockReturnValueOnce(''); // dry-run

    input.mockReturnValueOnce('build/workspace'); // directory
    input.mockReturnValueOnce(''); // silent

    execute.mockResolvedValueOnce(0); // npm version
    execute.mockResolvedValueOnce(0); // npm publish

    await action({
      execute,
      input,
      output,
      fail,
    });

    expect(execute).toBeCalledTimes(2);
    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      1,
      'npm version',
      [
        '2.3.4',
        '--force',
        '--allow-same-version',
        '--no-git-tag-version',
      ],
      {
        cwd: 'build/workspace',
        silent: false,
      },
    );

    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      2,
      'npm publish',
      [
        '--access', 'public',
        '--tag', 'latest',
      ],
      {
        cwd: 'build/workspace',
        silent: false,
      },
    );

    expect(input).toBeCalledTimes(6);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });
    expect(input).toHaveBeenNthCalledWith<[string]>(2, 'access');
    expect(input).toHaveBeenNthCalledWith<[string]>(3, 'tag');
    expect(input).toHaveBeenNthCalledWith<[string]>(4, 'dry-run');
    expect(input).toHaveBeenNthCalledWith<[string]>(5, 'directory');
    expect(input).toHaveBeenNthCalledWith<[string]>(6, 'silent');

    expect(output).toBeCalledTimes(1);
    expect(output).toHaveBeenNthCalledWith<[string, string]>(1, 'version', '2.3.4');

    expect(fail).toBeCalledTimes(0);
  });

  it('with valid input, with silent, execute version and publish, output version', async (): Promise<void> => {
    const execute = fn<ActionExecuteFunction>();
    const input = fn<ActionInputFunction>();
    const output = fn<ActionOutputFunction>();
    const fail = fn<ActionFailFunction>();

    input.mockReturnValueOnce('2.3.4'); // version
    input.mockReturnValueOnce(''); // access
    input.mockReturnValueOnce(''); // tag
    input.mockReturnValueOnce(''); // dry-run

    input.mockReturnValueOnce(''); // directory
    input.mockReturnValueOnce('true'); // silent

    execute.mockResolvedValueOnce(0); // npm version
    execute.mockResolvedValueOnce(0); // npm publish

    await action({
      execute,
      input,
      output,
      fail,
    });

    expect(execute).toBeCalledTimes(2);
    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      1,
      'npm version',
      [
        '2.3.4',
        '--force',
        '--allow-same-version',
        '--no-git-tag-version',
      ],
      {
        cwd: undefined,
        silent: true,
      },
    );

    expect(execute).toHaveBeenNthCalledWith<[string, string[], ActionExecuteFunctionOptions]>(
      2,
      'npm publish',
      [
        '--access', 'public',
        '--tag', 'latest',
      ],
      {
        cwd: undefined,
        silent: true,
      },
    );

    expect(input).toBeCalledTimes(6);
    expect(input).toHaveBeenNthCalledWith<[string, ActionInputFunctionOptions]>(1, 'version', { required: true });
    expect(input).toHaveBeenNthCalledWith<[string]>(2, 'access');
    expect(input).toHaveBeenNthCalledWith<[string]>(3, 'tag');
    expect(input).toHaveBeenNthCalledWith<[string]>(4, 'dry-run');
    expect(input).toHaveBeenNthCalledWith<[string]>(5, 'directory');
    expect(input).toHaveBeenNthCalledWith<[string]>(6, 'silent');

    expect(output).toBeCalledTimes(1);
    expect(output).toHaveBeenNthCalledWith<[string, string]>(1, 'version', '2.3.4');

    expect(fail).toBeCalledTimes(0);
  });
});
