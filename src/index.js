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
 * @param {String|String[]} globs - The glob patterns that identify the files to watch.
 * @return {void}
 */
function eslintWatch(globs) {
  const watcher = chokidar.watch(globs, {
    ignored: /[\/\\]\./,
    persistent: true
  });
  watcher.on('ready', () => {
    watcher.on('add', path => { eslint([path]); });
    watcher.on('change', path => { eslint([path]); });
  });
}

if (!argsv.g) {
  //
  // print help info if args are missing
  //
  console.log('Usage: build-lint -g <glob pattern> [-g <glob pattern>] [-w]');
  console.log('');
  console.log('Options:');
  console.log('-g\t A glob pattern that identifies files to lint.  Multiple glob patterns can be specified.');
  console.log('-w\t When present the files specified in the glob pattern(s) will be watched for changes and linted when they do change.');
  console.log('-W\t This is the same as the -w command except that the specified files will be linted before the watch begins.');
  process.exit(1);
}

if (argsv.W || !argsv.w) {
  //
  // lint files specified and optional begin watch
  //
  globby(argsv.g).then(paths => {
    // execute eslint
    eslint(paths)
      .on('exit', code => {
        if (argsv.W) {
          eslintWatch(argsv.g);
        } else {
          process.exit(code);
        }
      });
  });
} else if (argsv.w) {
  //
  // watch for file changes
  //
  eslintWatch(argsv.g);
}
