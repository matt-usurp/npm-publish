import core from '@actions/core';
import { execute, publish, version } from './action/command';
import { normalise } from './action/options';

export async function main(): Promise<void> {
  try {
    const options = normalise({
      version: core.getInput('version', { required: true }),
      directory: core.getInput('directory'),
      tag: core.getInput('tag'),
      private: core.getInput('private'),
      silent: core.getInput('silent'),
      dry: core.getInput('dry'),
    });

    await execute(version(options));
    await execute(publish(options));

    core.setOutput('version', options.version);
  } catch (error) {
    core.setFailed(error);
  }
}

main();
