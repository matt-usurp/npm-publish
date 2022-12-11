import { PublishAccess } from '../npm';
import { normaliseInputDistributionTagValue, normaliseInputPublishAccessValue, normaliseInputVersionValue } from './input';

describe('normaliseInputVersionValue()', (): void => {
  it('with empty string, throw error, missing required input', (): void => {
    expect(
      () => normaliseInputVersionValue(''),
    ).toThrowError('The npm-version must be provided and be a valid semantic version');
  });

  it('with invalid string, incomplete, throw error, invalid semantic version', (): void => {
    expect(
      () => normaliseInputVersionValue('1.2'),
    ).toThrowError('The npm-version given "1.2" is not a valid semantic version');
  });

  it('with valid string, version, throw error, return version', (): void => {
    expect(
      normaliseInputVersionValue('2.4.3'),
    ).toStrictEqual<string>('2.4.3');
  });

  it('with valid string, version with prefix, return version', (): void => {
    expect(
      normaliseInputVersionValue('v1.2.3'),
    ).toStrictEqual<string>('v1.2.3');
  });

  it('with valid string, version with extra, return version', (): void => {
    expect(
      normaliseInputVersionValue('4.3.2-next.1'),
    ).toStrictEqual<string>('4.3.2-next.1');
  });
});

describe('normaliseInputPublishAccessValue()', (): void => {
  it('with empty string, default, return publish access, public', (): void => {
    expect(
      normaliseInputPublishAccessValue(''),
    ).toStrictEqual(PublishAccess.Public);
  });

  it('with invalid string, throw error', (): void => {
    expect(
      () => normaliseInputPublishAccessValue('foobar'),
    ).toThrowError('The npm-access tag "foobar" is not valid, must be either "public" or "restricted"');
  });

  it.each<{ readonly input: string; readonly expected: PublishAccess }>([
    { input: 'public', expected: PublishAccess.Public },
    { input: 'PUBLIC', expected: PublishAccess.Public },
    { input: 'Public', expected: PublishAccess.Public },

    { input: 'restricted', expected: PublishAccess.Restricted },
    { input: 'RESTRICTED', expected: PublishAccess.Restricted },
    { input: 'Restricted', expected: PublishAccess.Restricted },
  ])('with value, $input, returns publish access, $expected', (data): void => {
    expect(
      normaliseInputPublishAccessValue(data.input),
    ).toStrictEqual(data.expected);
  });
});

describe('normaliseInputDistributionTagValue()', (): void => {
  it('with empty string, default, return distribution tag, latest', (): void => {
    expect(
      normaliseInputDistributionTagValue(''),
    ).toStrictEqual<string>('latest');
  });

  it('with string, return distribution tag, given value', (): void => {
    expect(
      normaliseInputDistributionTagValue('next'),
    ).toStrictEqual<string>('next');
  });
});
