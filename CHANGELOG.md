# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/matt-usurp/npm-publish/compare/v1.2.0...v2.0.0) (2022-12-10)

### Features

- Upgraded `@action` packages to latest versions.
- Rewrote the action from the ground up, now full covered with tests.
- The `version` input parameter is now optional.
When the `version` input is not provided it will only publish, whereas when it is provided it will first force the version to  be updated.

### Breaking Changes

- The `version` input parameter is no longer "coerced" into a valid semantic version and now requires a valid semantic version to be provided.
For coercing of semantic versions you can look at the [validate-semver action](https://github.com/matt-usurp/validate-semver) that I also maintain and make use of its outputs.
- The `execute` input parameter has been renamed to `dry-run` and its functionality has been inverted.
Now the action will always publish unless the `dry-run` input parameter is truthy.
- The action no longer has any outputs.

## [1.2.0](https://github.com/matt-usurp/npm-publish/compare/v1.1.0...v1.2.0) (2021-03-17)


### Features

* remove token from parameters ([804d574](https://github.com/matt-usurp/npm-publish/commit/804d5747021641db245032dad817e61d0cd7d8f7))


### Bug Fixes

* remember to build code to repository ([f32b6e0](https://github.com/matt-usurp/npm-publish/commit/f32b6e007ae4d64742199c2059f8446e8f8164b1))

## [1.1.0](https://github.com/matt-usurp/npm-publish/compare/v1.0.0...v1.1.0) (2021-03-17)


### Features

* version allows same version flag ([8a33994](https://github.com/matt-usurp/npm-publish/commit/8a33994ef2360e8943bf478835e436c61a0bb486))


### Bug Fixes

* our environment over process environment ([f0eab62](https://github.com/matt-usurp/npm-publish/commit/f0eab6256fa2ff58125f0fe7ff23ad6eb21245ae))

### 1.0.0 (2021-03-13)


### Features

* authentication token for npm ([1e8b27a](https://github.com/matt-usurp/npm-publish/commit/1e8b27ad065ea47bf1ce85acf990a94937d51b6d))
* commit first build attempt at action ([0a663b0](https://github.com/matt-usurp/npm-publish/commit/0a663b0eca90ae42f6d8e1718cecc30979b186f3))
* dry-run by default, pretty console output ([4f0eb86](https://github.com/matt-usurp/npm-publish/commit/4f0eb8678060e1e7e7ebc6bff8810fc70fe0aa02))
* git ref access as version, also version properly cleaned ([53a8ee3](https://github.com/matt-usurp/npm-publish/commit/53a8ee3bc1f10625b3cfa9d9e6b1c2c2d7efb882))
* theoretical action implementation through tests ([266cc24](https://github.com/matt-usurp/npm-publish/commit/266cc24accd67f5a6c6bb214b008bc9e3de3e806))


### Bug Fixes

* compile for node 12 ([d2f3d51](https://github.com/matt-usurp/npm-publish/commit/d2f3d516dd1a6b4ed6f35c4643c091129da02090))
