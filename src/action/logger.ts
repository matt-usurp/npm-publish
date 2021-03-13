/**
 * A representation of a typical logger function.
 */
export type LoggerFunction = (message: string) => void;

const reset = '\u001b[0m';
const cyan = '\u001b[36m';
const yellow = '\u001b[33m';

export function header(message: string): string {
  return `${yellow}:> ${cyan}${message}${reset}`;
}

export function keypair(key: string, value: string): string {
  return `${reset}${key}: ${yellow}${value}${reset}`;
}
