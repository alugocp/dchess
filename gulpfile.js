const gulp = require('gulp');
const typescript = require('gulp-tsc');
const paths = {
  ts: ['./src/*.ts', './src/**/*.ts']
};

gulp.task('compile', function(){
  return gulp.src(paths.ts)
    .pipe(typescript())
    .pipe(gulp.dest('www/'));
});
