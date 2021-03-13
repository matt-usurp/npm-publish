# Simplistic NPM Package publishing

Publish packages to NPM with a specified `version`.

## Why?

Depending on your use-case, bumping the version in `package.json` and the repository can be a pain and will most likely not match up.
That and most likely you are using a workflow with git that already handles versioning.

In this case you could create a `github-workflow` that publishes a package version when a tag is created against the repository.
This means a package "version" is a result of a tag--the content of which will match (or be built from) the source of the tag.

> This feels a lot like the way [composer](https://getcomposer.org/) works for the PHP ecosystem.

## Example

Here is a usage example that publishes a npm package based on tag:

```yaml
on:
  push:
    tags:
      - v*.*.*

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - uses: matt-usurp/npm-publish@v1
        with:
          version: ${{ github.ref }}
          token: ${{ secrets.NPM_AUTH_TOKEN }}
```

In practice it looks as follows:

```
git tag -a v1.0.0
# produces git-ref: refs/tags/v1.0.0

git push --tags
# github triggers workflow, tag matches v*.*.*
# action resolves refs/tags/v1.0.0 to 1.0.0
# action runs the following commands
npm version 1.0.0
npm publish
```

## Parameters

You can configure the action with the following parameters:

| Name | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `version` | `string` | `true` | `n/a` | The version to publish |
| `token` | `string` | `true` | `n/a` | The authentication token to use |
| `directory` | `string` | `false` | `cwd` | The directory to publish |
| `tag` | `string` | `false` | `latest` | The [npm-dist-tag](https://docs.npmjs.com/cli/v7/commands/npm-dist-tag) to be used |
| `access` | `string` | `false` | `public` | The [npm-access](https://docs.npmjs.com/cli/v7/commands/npm-access) to be used |
| `silent` | `boolean` | `false` | `false` | If command output should be silenced |
| `execute` | `boolean` | `false` | `false` | If the publish command should actually be ran, default is to dry run |

> The `boolean` type represents a value that is boolean truthy when evaluated.
> For a `true` value, use the string `"true"` or `1`, all other values will represent `false`.

The follow are available through `steps.<id>.outputs` when the action has completed.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `version` | `string` | The version used for publishing |

> The `version` output will be normalised and cleansed.
> Passing a `git-ref` will always result in the `version` being the semvar string.

### Version parameter in-depth

The `version` parameter can be a semver compliant version string or a [git-ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) for a tag.
The version may be prefixed with the `v` also, this will be stripped when publishing.

```
1.2.3  -> 1.2.3
v2.3.4 -> 2.3.4
```

When supplying a partial version, it will be "coerced" in to a valid version.

```
1.0    -> 1.0.0
v1     -> 1.0.0
v2.3   -> 2.3.0
```

If you are using a `git-ref` then it will be normalised to just the tag name.
Once normalised the tag name must comply with the `version` parameters validation mentioned above.

```
refs/tags/1.0.0 -> 1.0.0
refs/tags/v1    -> 1.0.0
refs/tags/v2.3  -> 2.3.0
```

### Execute parameter reasoning

As mentioned above in the parameters documentation--the `execute` parameter is set to `false` by default.
This should assist in cases where you are testing the action and won't accidently publish a broken package.
When you have tested the action and are happy, set `execute` to `true`.

```yaml
with:
  execute: true
```

Because of this, the `execute` parameter is not mentioned in any examples or use-cases.

> Note that even though the `execute` parameter is set to `false` the version change is still ran.
> This `execute` parameter only affects the `npm publish` command.
> This will leave the `package.json` (and lock) in a dirty state for any following commands.
