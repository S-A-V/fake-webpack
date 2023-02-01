import { log } from './utils.js';

export function say(name) {
  log('Hello.');
  return `Hello, ${name}.`;
}
