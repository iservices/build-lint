/* eslint-env node, mocha */
'use strict';

const gulp = require('gulp');
const fs = require('fs');

/**
 * Unit tests for registerTasks function.
 */
describe('registerTasks', function () {
  gulp.on('stop', function () {
    process.exit(0); // need this call to end long running watch process
  });

  it('simple passing task setup works as expected.', function (done) {
    require(__dirname + '/fixtures/passing/gulpfile');
    gulp.on('task_stop', function (e) {
      if (e.task === 'passing-lint') {
        done();
      }
    });
    gulp.on('task_err', function (e) {
      if (e.task === 'passing-lint') {
        done(e.err);
      }
    });
    gulp.start('passing-lint');
  });
/*
  it('simple failing task setup works as expected.', function (done) {
    require(__dirname + '/fixtures/failing/gulpfile');
    gulp.on('task_stop', function (e) {
      if (e.task === 'failing-lint') {
        done(new Error('The task passed when it should have failed.'));
      }
    });
    gulp.on('task_err', function (e) {
      if (e.task === 'failing-lint') {
        done();
      }
    });
    gulp.start('failing-lint');
  });
*/
  it('simple watch task setup works as expected.', function (done) {
    this.timeout(8000);

    require(__dirname + '/fixtures/watch/gulpfile');
    gulp.on('task_stop', function (e) {
      if (e.task === 'watch-watch-lint') {
        setTimeout(function () {
          const text = fs.readFileSync(__dirname + '/fixtures/watch/chat/logger.js', 'utf8');
          fs.writeFileSync(__dirname + '/fixtures/watch/chat/logger.js', text);
        }, 2000);
        setTimeout(function (finish) {
          finish();
        }, 4000, done);
      }
    });
    gulp.start('watch-watch-lint');
  });
});
