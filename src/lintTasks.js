/*
 * Tasks and functions related to checking code styles.
 *
 * @author Nate Wallace
 */

/* eslint no-console:0,object-shorthand:0 */
'use strict';

const gulp = require('gulp');
const lint = require('gulp-eslint');

/**
  * This function is used to notify developers of an error that occured
  * as a result of a changed file.
  *
  * @param {Error} err - The error to notify the user about.
  * @param {string} title - The title for the notification window.
  * @param {string} message - The message to display in the notification window.
  * @returns {void}
  */
function notify(err, title, message) {
  require('node-notifier').notify({
    title: title,
    message: message
  });

  if (err) {
    if (err.message) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  }
}

/**
 * Registers gulp tasks for linting.
 *
 * @param {object} opts - Configuration options
 * @param {string|string[]} opts.glob - Glob patterns identifying the code to lint.
 * @param {string} [opts.tasksPrefix] - An optional prefix for the registered tasks.
 * @param {string[]} [opts.tasksDependencies] - Optional array of tasks names that must be completed before these registered tasks runs.
 * @returns {functions} - A function used to register gulp tasks
 */
module.exports = (opts) => {
  const input = {
    glob: opts.glob,
    tasksDependencies: opts.tasksDependencies || []
  };

  if (opts.tasksPrefix) {
    input.tasksPrefix = opts.tasksPrefix + '-';
  } else {
    input.tasksPrefix = '';
  }

  /*
   * Report on any linting issues in the code.
   */
  gulp.task(input.tasksPrefix + 'lint', input.tasksDependencies, function () {
    return gulp.src(input.glob)
      .pipe(lint())
      .pipe(lint.format())
      .pipe(lint.failOnError());
  });

  /*
   * Watch for linting issues.
   */
  gulp.task(input.tasksPrefix + 'watch-lint', function () {
    const watch = require('gulp-watch');
    watch(input.glob, function (file) {
      console.log('watch lint: ' + file.path + ' event: ' + file.event);
      if (file.event !== 'unlink') {
        gulp.src(file.path)
          .pipe(lint())
          .pipe(lint.format())
          .pipe(lint.failOnError())
          .on('error', function () {
            notify(null, 'Lint Error', 'See console for details.');
          });
      }
    });
  });
};
