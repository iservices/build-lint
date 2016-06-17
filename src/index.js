#!/usr/bin/env node

'use strict';

const globby = require('globby');
const chokidar = require('chokidar');
const cp = require('child_process');
const argsv = require('minimist')(process.argv.slice(2));

/**
 * Execute the eslint command.
 *
 * @ignore
 * @param {String[]} files - The files to lint.
 * @return {ChildProcess} The child process that does the linting.
 */
function eslint(files) {
  return cp.spawn('eslint', files, { stdio: 'inherit' });
}

/**
 * Watch for changes to the given files and execute eslint when they do change.
 *
 * @ignore
 * @param {Object} args - The arguments passed into the command line.
 * @return {void}
 */
function eslintWatch(args) {
  if (args._.length) {
    const watcher = chokidar.watch(args._, {
      ignored: /[\/\\]\./,
      persistent: true
    });
    watcher.on('ready', () => {
      watcher.on('add', file => { eslint([file]); });
      watcher.on('change', file => { eslint([file]); });
    });
  }
}

if (!argsv._.length) {
  //
  // print help info if args are missing
  //
  console.log('Usage: build-lint <files> [<files>] [-w]');
  console.log('');
  console.log('Options:');
  console.log('<files>\t A glob pattern that identifies files to lint.  Multiple glob patterns can be specified.');
  console.log('-w\t When present the files specified in the glob pattern(s) will be watched for changes and linted when they do change.');
  process.exitCode = 1;
} else if (argsv.w) {
  //
  // Watch for file changes
  //
  eslintWatch(argsv);
} else {
  //
  // lint files specified
  //
  globby(argsv._).then(files => {
    // execute eslint
    eslint(files)
      .on('exit', code => {
        process.exitCode = code;
      });
  });
}
