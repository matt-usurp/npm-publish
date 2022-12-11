import type { InputOptions as ActionInputFunctionOptions } from '@actions/core';
import type { ExecOptions as ActionExecuteFunctionOptions } from '@actions/exec';
import { normaliseInputBooleanValue, normaliseInputStringValue } from './action/input';
import type { CommandOptions } from './command';
import * as command from './command';
import * as npm from './command/npm';
import { normaliseInputDistributionTagValue, normaliseInputPublishAccessValue, normaliseInputVersionValue } from './command/npm/input';

export type {
  ActionInputFunctionOptions,
  ActionExecuteFunctionOptions,
};

/**
 * A function that can retreive the action input of the given {@link name}.
 */
export type ActionInputFunction = (name: string, options?: ActionInputFunctionOptions) => string;

/**
 * A function that can set an action output of the given {@link name}.
 */
export type ActionOutputFunction = (name: string, value: string) => void;

/**
 * A function that can execute commands against the build environment.
 */
export type ActionExecuteFunction = (command: string, args?: string[], options?: ActionExecuteFunctionOptions) => Promise<number>;

/**
 * A function that can fail the build for a given {@link reason}.
 */
export type ActionFailFunction = (reason: string) => void;

/**
 * An abstraction that allows for testing of the main action function.
 * These are the dependencies that are required for the action to run.
 */
export type ActionDependencies = {
  readonly input: ActionInputFunction;
  readonly output: ActionOutputFunction;
  readonly execute: ActionExecuteFunction;
  readonly fail: ActionFailFunction;
};

/**
 * The actions main function that runs the logic.
 */
export const action = async (action: ActionDependencies): Promise<void> => {
  try {
    const version = normaliseInputVersionValue(action.input('version', { required: true }));
    const access = normaliseInputPublishAccessValue(action.input('access'));
    const tag = normaliseInputDistributionTagValue(action.input('tag'));
    const dryrun = normaliseInputBooleanValue(action.input('dry-run'));

    const options: CommandOptions = {
      cwd: normaliseInputStringValue(action.input('directory')),
      silent: normaliseInputBooleanValue(action.input('silent')),
    };

    await command.execute(action.execute, npm.version(version, options));
    await command.execute(action.execute, npm.publish(access, tag, dryrun, options));

    action.output('version', version);
  } catch (error: unknown) {
    action.fail(`An expected error occured: ${error}`);
  }
};
