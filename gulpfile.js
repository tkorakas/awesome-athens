const gulp = require('gulp');
const sass = require('gulp-sass');

// Compile sass to css for dev.
gulp.task('sass', () => {
  return gulp.src('./sass/*.scss')
  // Initializes sourcemaps.
    .pipe(sass.sync().on('error', sass.logError))
    // Writes sourcemaps into the CSS file.
    .pipe(gulp.dest('./css'))
});


gulp.task('default', () => {
  gulp.watch('./sass/*.scss', ['sass']);
});