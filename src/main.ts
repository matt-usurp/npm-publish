import { getInput as input, setFailed as fail, setOutput as output } from '@actions/core';
import { exec as execute } from '@actions/exec';
import { action } from './core/action';

void action({
  execute,
  input,
  output,
  fail,
});
