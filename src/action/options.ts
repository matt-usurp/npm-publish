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
  dry: string;
};

export enum PublishAccess {
  Public = 'public',
  Private = 'private',
}

export type ActionOptions = {
  version: string;
  directory: string;
  tag: string;
  access: PublishAccess;
  silent: boolean;
  dry: boolean;
};

export function normalise(input: InputActionOptions): ActionOptions {
  return {
    version: normaliseVersion(input.version),
    directory: normaliseDirectory(input.directory),
    access: normalisePublishAccess(normaliseBoolean(input.private)),
    tag: normaliseDistributionTag(input.tag),
    silent: normaliseBoolean(input.silent),
    dry: normaliseBoolean(input.dry),
  };
}

export function normaliseVersion(value: string): string {
  if (value.startsWith('v') === true) {
    return value.substr(1);
  }

  return value;
}

export function normaliseDirectory(value: string): string {
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
