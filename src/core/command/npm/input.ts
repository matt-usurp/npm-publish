import { valid } from 'semver';
import { normaliseInputStringValue } from '../../action/input';
import { PublishAccess } from '../npm';

/**
 * Normalise the given `npm-version` value to be valid.
 * The value is expected to be required so will throw an error when the value is invalid.
 *
 * @see https://docs.npmjs.com/cli/v6/commands/npm-version
 */
export const normaliseInputVersionValue = (value: string): string => {
  const normalised = normaliseInputStringValue(value);

  if (normalised === undefined) {
    throw new Error('The npm-version must be provided and be a valid semantic version');
  }

  const validated = valid(normalised);

  if (validated === null) {
    throw new Error(`The npm-version given "${normalised}" is not a valid semantic version`);
  }

  return normalised;
};

/**
 * Normalise the given `npm-access` value to be valid.
 * If the value is not present then it uses the access `public` by default.
 *
 * @see https://docs.npmjs.com/cli/v6/commands/npm-access
 */
export const normaliseInputPublishAccessValue = (value: string): PublishAccess => {
  const normalised = normaliseInputStringValue(value);

  if (normalised === undefined) {
    return PublishAccess.Public;
  }

  switch (value.toLowerCase()) {
    case PublishAccess.Public:
      return PublishAccess.Public;

    case PublishAccess.Private:
      return PublishAccess.Private;

    default:
      throw new Error(`The npm-access tag "${value}" is not valid, must be either "public" or "private"`);
  }
};

/**
 * Normalise the given `npm-dist-tag` value to be valid.
 * If the value is not provided then it uses the tag `latest` by default.
 *
 * @see https://docs.npmjs.com/cli/v6/commands/npm-dist-tag
 */
export const normaliseInputDistributionTagValue = (value: string): string => {
  return normaliseInputStringValue(value) ?? 'latest';
};
