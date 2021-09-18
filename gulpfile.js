const gulp = require('gulp');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const del = require('del');
const paths = {
  static: ['./static/*', './static/**/*'],
  ts: ['./src/*.ts', './src/**/*.ts'],
  build: ['./www/*', './www/**/*']
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
    .pipe(ts({
      outFile: 'script.js'
    }))
    .pipe(minify({
      noSource: true,
      ext: {
        min: '.min.js'
      }
    }))
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
