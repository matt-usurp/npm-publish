import { ActionOptions, normalise, normaliseBoolean, normaliseDirectory, normaliseDistributionTag, normalisePublishAccess, normaliseVersion, PublishAccess } from './options';

describe('src/action/options.ts', (): void => {
  describe('normalise()', (): void => {
    it('can normalise basic arguments', (): void => {
      const expected: ActionOptions = {
        version: '1.0.0',
        directory: 'build',
        tag: 'latest',
        access: PublishAccess.Public,
        silent: false,
        execute: false,
      };

      expect(
        normalise({
          version: '1.0',
          directory: 'build',
          tag: '',
          access: '',
          silent: '',
          execute: '',
        })
      ).toStrictEqual(expected);
    });

    it('can normalise basic arguments, with version prefix and dry', (): void => {
      const expected: ActionOptions = {
        version: '1.23.4',
        directory: 'build',
        tag: 'latest',
        access: PublishAccess.Public,
        silent: false,
        execute: true,
      };

      expect(
        normalise({
          version: 'v1.23.4',
          directory: 'build',
          tag: '',
          access: '',
          silent: '',
          execute: 'true',
        })
      ).toStrictEqual(expected);
    });
  });

  describe('normaliseVersion()', (): void => {
    type VersionTestCase = [
      value: string,
      expected: string,
    ];

    it.each<VersionTestCase>([
      ['1', '1.0.0'],
      ['2', '2.0.0'],
      ['3', '3.0.0'],

      ['1.0', '1.0.0'],
      ['1.1', '1.1.0'],
      ['3.4', '3.4.0'],

      ['1.0.0', '1.0.0'],
      ['1.2.3', '1.2.3'],
      ['3.4.2', '3.4.2'],
    ])('with version %s, without prefix', (value, expected): void => {
      expect(normaliseVersion(value)).toStrictEqual(expected);
    });

    it.each<VersionTestCase>([
      ['v1', '1.0.0'],
      ['v2', '2.0.0'],
      ['v3', '3.0.0'],

      ['v1.0', '1.0.0'],
      ['v1.1', '1.1.0'],
      ['v3.4', '3.4.0'],

      ['v1.0.0', '1.0.0'],
      ['v1.2.3', '1.2.3'],
      ['v3.4.2', '3.4.2'],
    ])('with version %s, with prefix', (value, expected): void => {
      expect(normaliseVersion(value)).toStrictEqual(expected);
    });

    it.each<VersionTestCase>([
      ['refs/tags/1', '1.0.0'],
      ['refs/tags/2', '2.0.0'],
      ['refs/tags/3', '3.0.0'],

      ['refs/tags/1.0', '1.0.0'],
      ['refs/tags/1.1', '1.1.0'],
      ['refs/tags/3.4', '3.4.0'],

      ['refs/tags/1.0.0', '1.0.0'],
      ['refs/tags/1.2.3', '1.2.3'],
      ['refs/tags/3.4.2', '3.4.2'],
    ])('with version %s, as ref, without prefix', (value, expected): void => {
      expect(normaliseVersion(value)).toStrictEqual(expected);
    });

    it.each<VersionTestCase>([
      ['refs/tags/v1', '1.0.0'],
      ['refs/tags/v2', '2.0.0'],
      ['refs/tags/v3', '3.0.0'],

      ['refs/tags/v1.0', '1.0.0'],
      ['refs/tags/v1.1', '1.1.0'],
      ['refs/tags/v3.4', '3.4.0'],

      ['refs/tags/v1.0.0', '1.0.0'],
      ['refs/tags/v1.2.3', '1.2.3'],
      ['refs/tags/v3.4.2', '3.4.2'],
    ])('with version %s, as ref, with prefix', (value, expected): void => {
      expect(normaliseVersion(value)).toStrictEqual(expected);
    });
  });

  describe('normaliseDirectory()', (): void => {
    it('with blank directory, return undefined', (): void => {
      expect(normaliseDirectory('')).toStrictEqual(undefined);
    });

    it('with directory value, return directory', (): void => {
      expect(normaliseDirectory('build')).toStrictEqual('build');
      expect(normaliseDirectory('dist')).toStrictEqual('dist');
    });
  });

  describe('normaliseDistributionTag()', (): void => {
    it('with blank value provided, fallback latest', (): void => {
      expect(normaliseDistributionTag('')).toStrictEqual('latest');
    });

    it('with given value, return given value', (): void => {
      expect(normaliseDistributionTag('alpha')).toStrictEqual('alpha');
      expect(normaliseDistributionTag('beta')).toStrictEqual('beta');
      expect(normaliseDistributionTag('dev')).toStrictEqual('dev');
    });
  });

  describe('normalisePublishAccess()', (): void => {
    it('can resolve blank value, public', (): void => {
      expect(normalisePublishAccess('')).toStrictEqual(PublishAccess.Public);
    });

    it('can resolve access, public', (): void => {
      expect(normalisePublishAccess('public')).toStrictEqual(PublishAccess.Public);
    });

    it('can resolve access, private', (): void => {
      expect(normalisePublishAccess('public')).toStrictEqual(PublishAccess.Private);
    });
  });

  describe('normaliseBoolean()', (): void => {
    it('can normalise boolean, true', (): void => {
      expect(normaliseBoolean('1')).toStrictEqual(true);
      expect(normaliseBoolean('true')).toStrictEqual(true);
      expect(normaliseBoolean('t')).toStrictEqual(true);
      expect(normaliseBoolean('yes')).toStrictEqual(true);
      expect(normaliseBoolean('y')).toStrictEqual(true);
    });

    it('can normalise boolean, false', (): void => {
      expect(normaliseBoolean('0')).toStrictEqual(false);
      expect(normaliseBoolean('false')).toStrictEqual(false);
      expect(normaliseBoolean('f')).toStrictEqual(false);
      expect(normaliseBoolean('no')).toStrictEqual(false);
      expect(normaliseBoolean('n')).toStrictEqual(false);
    });
  });
});
