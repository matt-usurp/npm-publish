import { ActionOptions, normalise, normaliseBoolean, normaliseDirectory, normaliseDistributionTag, normalisePublishAccess, normaliseVersion, PublishAccess } from './options';

describe('src/action/options.ts', (): void => {
  describe('normalise()', (): void => {
    it('can normalise basic arguments', (): void => {
      const expected: ActionOptions = {
        version: '1.0',
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
          private: '',
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
          private: '',
          silent: '',
          execute: 'true',
        })
      ).toStrictEqual(expected);
    });
  });

  describe('normaliseVersion()', (): void => {
    it('with no version prefix, return version', (): void => {
      expect(normaliseVersion('1')).toStrictEqual('1');
      expect(normaliseVersion('2')).toStrictEqual('2');

      expect(normaliseVersion('1.0')).toStrictEqual('1.0');
      expect(normaliseVersion('1.2')).toStrictEqual('1.2');
      expect(normaliseVersion('2.3')).toStrictEqual('2.3');

      expect(normaliseVersion('1.0.0')).toStrictEqual('1.0.0');
      expect(normaliseVersion('1.2.3')).toStrictEqual('1.2.3');
    });

    it('with version prefix, return version without prefix', (): void => {
      expect(normaliseVersion('v1')).toStrictEqual('1');
      expect(normaliseVersion('v2')).toStrictEqual('2');

      expect(normaliseVersion('v1.0')).toStrictEqual('1.0');
      expect(normaliseVersion('v1.2')).toStrictEqual('1.2');
      expect(normaliseVersion('v2.3')).toStrictEqual('2.3');

      expect(normaliseVersion('v1.0.0')).toStrictEqual('1.0.0');
      expect(normaliseVersion('v1.2.3')).toStrictEqual('1.2.3');
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
    it('can resolve access, public', (): void => {
      expect(normalisePublishAccess(false)).toStrictEqual(PublishAccess.Public);
    });

    it('can resolve access, private', (): void => {
      expect(normalisePublishAccess(true)).toStrictEqual(PublishAccess.Private);
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
