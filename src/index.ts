#!/usr/bin/env node
import path from 'path';

import chalk from 'chalk';
import yargs from 'yargs';

import generateForFolder from './generateIndexForFolder';

export const generateIndexForFolder = generateForFolder;

export function runCli() {
  const argv = yargs(process.argv.slice(2)).argv;
  // if we ever need some other options other than the rootFolder use yargs(process.argv.slice(2)).option('f',{...}).argv;

  const folder = (argv._[0] as string) || './';
  const sourceFolder = path.join(process.cwd(), folder);

  if (generateIndexForFolder(sourceFolder, sourceFolder, 10))
    chalk.green('> Successfully build the index.ts files \n');
}

runCli();
