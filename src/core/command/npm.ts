import type { Command, CommandOptions } from '../command';

/**
 * Supported access levels.
 *
 * @see https://docs.npmjs.com/cli/v6/commands/npm-access
 */
export const enum PublishAccess {
  Public = 'public',
  Private = 'private',
}

/**
 * Compose a `npm version` command to be executed.
 *
 * @see https://docs.npmjs.com/cli/v6/commands/npm-version
 */
export const version = (version: string, options?: CommandOptions): Command => {
  const args: string[] = [];

  args.push(version);
  args.push('--force');
  args.push('--allow-same-version');
  args.push('--no-git-tag-version');

  return {
    command: 'npm version',
    arguments: args,
    options,
  };
};

/**
 * Compose a `npm publish` command to be executed.
 *
 * This will attach command flags for {@link access} (visiblity) and {@link tag} (dist-tag).
 * If {@link dryrun} is set to true then the `--dry-run` flag is appended.
 *
 * @see https://docs.npmjs.com/cli/v6/commands/npm-publish
 */
export const publish = (access: PublishAccess, tag: string, dryrun: boolean, options?: CommandOptions): Command => {
  const args: string[] = [];

  args.push('--access', access);
  args.push('--tag', tag);

  if (dryrun === true) {
    args.push('--dry-run');
  }

  return {
    command: 'npm publish',
    arguments: args,
    options,
  };
};
