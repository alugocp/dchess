const gulp = require('gulp');
const typescript = require('gulp-tsc');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const del = require('del');
const paths = {
  build: ['./www/*', './www/**/*'],
  ts: ['./src/*.ts', './src/**/*.ts'],
  static: ['./src/index.html']
};

/*
  Clean the build path
*/
gulp.task('clean', function() {
  return del(paths.build);
});

/*
  Compile, concatenate and minify TypeScript source into the www folder
*/
gulp.task('compile', function() {
  return gulp.src(paths.ts)
    .pipe(typescript())
    .pipe(concat('script.js'))
    .pipe(minify())
    .pipe(gulp.dest('www/'));
});

/*
  Copy static files into the www folder
*/
gulp.task('copy', function() {
  return gulp.src(paths.static)
    .pipe(gulp.dest('www/'));
});

/*
  Run the full build process
*/
gulp.task('build', gulp.series('clean', 'compile', 'copy'), function() {
  return null;
});
