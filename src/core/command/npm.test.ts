import type { Command } from '../command';
import { publish, PublishAccess, version } from './npm';

describe('version()', (): void => {
  it('with required parameters, outputs expected command specification', (): void => {
    expect(
      version('1.2.3'),
    ).toStrictEqual<Command>({
      command: 'npm version',
      arguments: [
        '1.2.3',
        '--force',
        '--allow-same-version',
        '--no-git-tag-version',
      ],

      options: undefined,
    });
  });

  it('with required parameters, with command options, outputs expected command specification', (): void => {
    expect(
      version('2.3.4', {
        cwd: '/some/directory',
        silent: true,
      }),
    ).toStrictEqual<Command>({
      command: 'npm version',
      arguments: [
        '2.3.4',
        '--force',
        '--allow-same-version',
        '--no-git-tag-version',
      ],

      options: {
        cwd: '/some/directory',
        silent: true,
      },
    });
  });
});

describe('publish()', (): void => {
  it('with required parameters, outputs expected command specification', (): void => {
    expect(
      publish(PublishAccess.Public, 'latest', false),
    ).toStrictEqual<Command>({
      command: 'npm publish',
      arguments: [
        '--access', 'public',
        '--tag', 'latest',
      ],

      options: undefined,
    });
  });

  it('with required parameters, with dry run, true, outputs expected command specification', (): void => {
    expect(
      publish(PublishAccess.Public, 'latest', true),
    ).toStrictEqual<Command>({
      command: 'npm publish',
      arguments: [
        '--access', 'public',
        '--tag', 'latest',
        '--dry-run',
      ],

      options: undefined,
    });
  });

  it('with required parameters, with tag, next, outputs expected command specification', (): void => {
    expect(
      publish(PublishAccess.Public, 'next', false),
    ).toStrictEqual<Command>({
      command: 'npm publish',
      arguments: [
        '--access', 'public',
        '--tag', 'next',
      ],

      options: undefined,
    });
  });

  it('with required parameters, with access, restricted, outputs expected command specification', (): void => {
    expect(
      publish(PublishAccess.Restricted, 'latest', false),
    ).toStrictEqual<Command>({
      command: 'npm publish',
      arguments: [
        '--access', 'restricted',
        '--tag', 'latest',
      ],

      options: undefined,
    });
  });

  it('with required parameters, with command options, outputs expected command specification', (): void => {
    expect(
      publish(PublishAccess.Public, 'latest', false, {
        cwd: '/some/directory',
        silent: true,
      }),
    ).toStrictEqual<Command>({
      command: 'npm publish',
      arguments: [
        '--access', 'public',
        '--tag', 'latest',
      ],

      options: {
        cwd: '/some/directory',
        silent: true,
      },
    });
  });
});
