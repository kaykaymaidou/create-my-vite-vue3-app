#! /usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import packageJson from '../package.json' assert { type: 'json' };

const epilogText = `
  Only ${chalk.green('<project-directory>')} is required.

  A custom ${chalk.cyan('--scripts-version')} can be one of:
    - a specific npm version: ${chalk.green('0.8.2')}
    - a specific npm tag: ${chalk.green('@next')}
    - a custom fork published on npm: ${chalk.green('my-react-scripts')}
    - a local path relative to the current working directory: ${chalk.green('file:../my-react-scripts')}
    - a .tgz archive: ${chalk.green('https://mysite.com/my-react-scripts-0.8.2.tgz')}
    - a .tar.gz archive: ${chalk.green('https://mysite.com/my-react-scripts-0.8.2.tar.gz')}
  It is not needed unless you specifically want to use a fork.

  A custom ${chalk.cyan('--template')} can be one of:
    - a custom template published on npm: ${chalk.green('cra-template-typescript')}
    - a local path relative to the current working directory: ${chalk.green('file:../my-custom-template')}
    - a .tgz archive: ${chalk.green('https://mysite.com/my-custom-template-0.8.2.tgz')}
    - a .tar.gz archive: ${chalk.green('https://mysite.com/my-custom-template-0.8.2.tar.gz')}

  If you have any problems, do not hesitate to file an issue:
    ${chalk.cyan('https://github.com/facebook/create-react-app/issues/new')}
`;

// hideBin 相当于 require("process").argv.slice(2)
const argv = hideBin(process.argv);
const program = yargs(argv)
  .scriptName('create-my-vue3-app')
  .command(
    `$0 <app-name> [option]`,
    `Create a new Vue3 app in ${process.cwd()}.`,
    (yargs) => {
      return yargs.positional('app-name', {
        describe: 'Name of the application',
        type: 'string',
        demandOption: true
      }).option('f', {
        alias: 'force',
        describe: 'Overwrite target directory if it is existed'
      });
    },
    (argv) => {
      import('../lib/create.js').then(({ default: create }) => {
        create(argv.appName, argv);
      });
    }
  )
  .usage(`Usage: $0 ${chalk.green('<project-directory>')} [options]`)
  .version('V', 'output the version number', packageJson.version)
  .alias("V", "version")
  .options({
    'verbose': {
      describe: 'print additional logs',
    },
    'info': {
      describe: 'print environment debug info',
    },
    'scripts-version': {
      describe: 'use a non-standard version of react-scripts',
    },
    'template': {
      describe: 'specify a template for the created project',
    },
  })
  .option('use-pnp')
  .help('h', 'output usage information')
  .alias("h", "help")
  .epilogue(epilogText)
  .strict()
  .parse(argv);
