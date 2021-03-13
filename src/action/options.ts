import clean from 'semver/functions/clean';
import coerce from 'semver/functions/coerce';

/**
 * All inputs are passed to the action through environment variables.
 * Meaning they will always be strings and maybe empty.
 */
export type InputActionOptions = {
  version: string;
  directory: string;
  tag: string;
  private: string;
  silent: string;
  execute: string;
};

export enum PublishAccess {
  Public = 'public',
  Private = 'private',
}

export type ActionOptions = {
  version: string;
  directory: string | undefined;
  tag: string;
  access: PublishAccess;
  silent: boolean;
  execute: boolean;
};

export function normalise(input: InputActionOptions): ActionOptions {
  return {
    version: normaliseVersion(input.version),
    directory: normaliseDirectory(input.directory),
    access: normalisePublishAccess(normaliseBoolean(input.private)),
    tag: normaliseDistributionTag(input.tag),
    silent: normaliseBoolean(input.silent),
    execute: normaliseBoolean(input.execute),
  };
}

export function normaliseVersion(value: string): string {
  const refless = value.replace(/^refs\/tags\/v/, '');
  const cleaned = coerce(refless);

  if (cleaned === null) {
    throw new Error(`The version "${refless}" is not a valid semver version`);
  }

  return cleaned.format();
}

export function normaliseDirectory(value: string): string | undefined {
  if (value === '') {
    return undefined;
  }

  return value;
}

export function normaliseDistributionTag(value: string): string {
  return value || 'latest';
}

export function normalisePublishAccess(value: boolean): PublishAccess {
  return value === true
    ? PublishAccess.Private
    : PublishAccess.Public;
}

export function normaliseBoolean(value: string): boolean {
  return [
    '1',
    'true',
    't',
    'y',
    'yes',
  ].includes(value.toLowerCase());
}
