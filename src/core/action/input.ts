/**
 * Normalise a given string input value.
 */
export const normaliseInputStringValue = (value: string): string | undefined => {
  const trimmed = value.trim();

  if (trimmed === '') {
    return undefined;
  }

  return trimmed;
};

/**
 * Normalise a given string input value to boolean.
 */
export const normaliseInputBooleanValue = (value: string): boolean => {
  const normalised = normaliseInputStringValue(value);

  if (normalised === undefined) {
    return false;
  }

  return [
    'true',
    't',
    'y',
    'yes',
    '1',
  ].includes(normalised.toLowerCase());
};
