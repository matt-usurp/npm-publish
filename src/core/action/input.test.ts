import { normaliseInputBooleanValue, normaliseInputStringValue } from './input';

describe('normaliseInputStringValue()', (): void => {
  it('with empty string, return undefined', (): void => {
    expect(
      normaliseInputStringValue(''),
    ).toStrictEqual(undefined);
  });

  it('with string, only whitespace, return undefined', (): void => {
    expect(
      normaliseInputStringValue(' '),
    ).toStrictEqual(undefined);
  });

  it('with string, return string', (): void => {
    expect(
      normaliseInputStringValue('foobar'),
    ).toStrictEqual('foobar');
  });

  it('with string, with whitespace, return string', (): void => {
    expect(
      normaliseInputStringValue(' foobar '),
    ).toStrictEqual('foobar');
  });
});

describe('normaliseInputBooleanValue()', (): void => {
  it.each<{ readonly input: string }>([
    { input: 'true' },
    { input: 'TRUE' },
    { input: 'True' },

    { input: 't' },
    { input: 'T' },

    { input: 'yes' },
    { input: 'YES' },
    { input: 'Yes' },

    { input: 'y' },
    { input: 'Y' },

    { input: '1' },
  ])('with value, $input, can normalise to boolean, return true', (data): void => {
    expect(
      normaliseInputBooleanValue(data.input),
    ).toStrictEqual(true);
  });

  it.each<{ readonly input: string }>([
    { input: 'false' },
    { input: 'FALSE' },
    { input: 'False' },

    { input: 'f' },
    { input: 'F' },

    { input: 'no' },
    { input: 'NO' },
    { input: 'No' },

    { input: 'n' },
    { input: 'N' },

    { input: '0' },
  ])('with value, $input, can normalise to boolean, return false', (data): void => {
    expect(
      normaliseInputBooleanValue(data.input),
    ).toStrictEqual(false);
  });
});
