'use strict';
var gulp       = require('gulp');
var browserify = require('browserify');
var transform  = require('vinyl-transform');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var shell      = require('gulp-shell');

var watch = false;

function buildBrowserify () {
  var b = browserify('./app/main.js', {
    debug: true
  });

  function bundle () {
    return b.bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest('./dist'));
  }

  if (watch) {
    b = watchify(b);
    b.on('update', function() {
      bundle();
    });
  }

  bundle();
}

gulp.task('copy', function() {
  gulp.src(['./app/manifest.json']).pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['copy'], function () {
  watch = true;
  buildBrowserify();
});

gulp.task('browserify', buildBrowserify);
gulp.task('default', ['test', 'copy', 'browserify']);
gulp.task('test', shell.task(['npm test']));
