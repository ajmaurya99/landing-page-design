/* eslint-disable prettier/prettier */

/**
 * Initialize all the gulp dependencies
 */
var { gulp, src, dest, watch, lastRun, series, parallel } = require('gulp'),
  rename = require('gulp-rename'), // @gulp-rename is to rename files
  uglify = require('gulp-uglify'), // @gulp-uglify uglify js files
  minify = require('gulp-clean-css'), //  @gulp-clean delete compiled files
  sass = require('gulp-sass'), // @gulp-sass process SCSS files
  autoprefixer = require('gulp-autoprefixer'), // @gulp-autoprefixer add vendor prefix
  babel = require('gulp-babel'); // @gulp-babel compile ES6 to ES5

/**
 * Perform JS uglification
 * @sourcemaps : created a map file for js files
 * @lastRun : Retrieves the last time a task was successfully completed during the current running process and enables incremental builds to speed up execution times by skipping files that haven't changed since the last successful task completion.
 */
function processJs() {
  return src('assets/scripts/*.js', {
    sourcemaps: true,
    since: lastRun(processJs),
  })
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('assets/dist/js', { sourcemaps: '.' }));
}

/**
 * Perform CSS minification
 */
function processCss() {
  return src(['assets/scss/frontend/**/*.scss'], {
    since: lastRun(processCss),
  })
    .pipe(sass()) // Using gulp-sass
    .pipe(autoprefixer('last 10 versions'))
    .pipe(minify())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('assets/dist/css'));
}

/**
 * Export as an independent tasks
 * gulp processJs
 * gulp processCss
 */
exports.processJs = processJs;
exports.processCss = processCss;

exports.default = parallel(processCss);

/**
 * The default gulp function.
 * watcher added for js and css files.
 * @ignoreInitial : Runs for the first time also when gulp command is run
 */
// exports.default = function () {
//   watch(
//     'assets/scripts/*.js',
//     { events: 'all', ignoreInitial: false },
//     processJs
//   );
//   watch(
//     ['assets/scss/frontend/**/*.scss'],
//     { events: 'all', ignoreInitial: false },
//     processCss
//   );
// };
