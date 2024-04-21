#!/usr/bin/env node
import path from 'path';

import chalk from 'chalk';
import yargs from 'yargs';

import generateForFolder from './generateIndexForFolder';

export const generateIndexForFolder = generateForFolder;

export function runCli() {
  const argv = yargs(process.argv.slice(2)).option('f', {
    alias: 'from',
    describe:
      'specify if you want to use folders or files to generate the index file.',
    type: 'string',
    choices: ['files', 'folders'],
  }).argv;
  const folder = (argv._[0] as string) || './';
  const sourceFolder = path.join(process.cwd(), folder);

  if (generateIndexForFolder(sourceFolder, 10))
    chalk.green('\n> Successfully to build the index.ts file \n');

  // fs.writeFile(path.join(sourceFolder, 'index.ts'), indexContentFile, err => {
  //   if (err) {
  //     console.error(err);
  //   }

  //   console.log(
  //     chalk.green('\n> Successfully to build the index.ts file :)\n')
  //   );
  // });
}

runCli();
