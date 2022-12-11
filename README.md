# Publish to Node Package Manager (NPM)

An action that wraps the [npm-publish](https://docs.npmjs.com/cli/v6/commands/npm-publish) command.
Also optionally calling the [npm-version](https://docs.npmjs.com/cli/v6/commands/npm-version) command before hand to allow for manual version publishing (see the `version` input parameter).

## Example

Here is an example usage that publishes the version `2.3.12` once checked out:

```yaml
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          registry-url: registry-url-here

      - uses: matt-usurp/npm-publish@v2
        with:
          version: '2.3.12'
          tag: 'next'
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
```

This essentially runs the following commands:

```sh
npm version 1.0.0 --force --allow-same-version --no-git-tag-version
npm publish --access public --tag next
```

> **Note**
> We use `--no-git-tag-version` because this action is not intended to have side effects.

## Inputs

You can configure the action with the following input parameters:

| Name | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| `version` | `string` | `false` | `[current]` | A valid semantic version to use when publishing |
| `tag` | `string` | `false` | `latest` | The [npm-dist-tag](https://docs.npmjs.com/cli/v7/commands/npm-dist-tag) to be used when publishing |
| `access` | `string` | `false` | `public` | The [npm-access](https://docs.npmjs.com/cli/v7/commands/npm-access) to be used when publishing |
| `dry-run` | `boolean` | `false` | `false` | If the publish command should be dry ran |
| `directory` | `string` | `false` | `cwd` | The directory to execute commands from |
| `silent` | `boolean` | `false` | `false` | Should command output be silenced |

> **Note**
> The `boolean` type represents a value that is boolean truthy when evaluated.
> For a `true` value, use the string `"true"` or `1`, all other values will represent `false`.

## Outputs

This action has no outputs.
